import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import UserForm from './UserForm';
import ConfirmDialog from './ConfirmDialog';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3000/api/login/members");
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarCollapsed(mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const openForm = (initialData = null) => {

    setFormInitialData(initialData);
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setUsers({
      name: '',
      email: '',
      address: '',
      dob: '',
      contact: '',
      joiningDate: '',
      role: 'Member',
      userType: 'user',
      image: null
    });
    setIsFormOpen(false);
    setFormInitialData(null);
  };

  const handleAddUser = async (user) => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : value);
    });

    try {
  
      await axios.post("http://localhost:3000/api/register", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
      const { data } = await axios.get("http://localhost:3000/api/login/members");
      setUsers(data);
    } catch (error) {
      let msg=error.response.data.data;
      setSnackbar({ open: true, message: `${msg}`, severity: 'error' });
    } finally {
      setFormLoading(false);
      closeForm();
    }
  };

  const handleUpdateUser = async (user) => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : value);
    });

    try {
      await axios.put(`http://localhost:3000/api/updateUser/${user._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      const { data } = await axios.get("http://localhost:3000/api/login/members");
      setUsers(data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error occurred', severity: 'error' });
    } finally {
      setFormLoading(false);
      closeForm();
    }
  };

  const handleFormSubmit = async (user) => {
    setFormLoading(true);
    formInitialData ? await handleUpdateUser(user) : await handleAddUser(user);
  };

  const handleAdd = () => openForm();
  const handleEdit = (user) => openForm(user);
  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:3000/api/deleteUser/${id}`);
      setUsers(users.filter(user => user._id !== id));
      setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error occurred', severity: 'error' });
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const openConfirm = (id) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };
  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <ProgressBar loading={loading} />
      <Spinner loading={formLoading} />
      <AdminNav toggleSidebar={toggleSidebar} />
      <div className='flex h-auto'>
        <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
          <SidebarMenu collapsed={isSidebarCollapsed} />
        </div>
        <Container className="h-auto">
          <Box my={4}>
            <Typography variant="h4" gutterBottom>User Management</Typography>
            <Box mb={4} p={2} border={1} borderColor="grey.300" borderRadius={4} className=' bg-slate-500 text-white'>
              <Typography variant="h6">Number of Users: {users.length}</Typography>
            </Box>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd} sx={{ mb: 2 }}>
              Add User
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ overflow: "scroll" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>DOB</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Joining Date</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>User Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell><img src={user.imageUrl} alt="User" height="100" width="100" /></TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.contact}</TableCell>
                      <TableCell>{new Date(user.dob).toLocaleDateString()}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.joiningDate).toLocaleDateString()}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.userType}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(user)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => openConfirm(user._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </div>
      <UserForm open={isFormOpen} handleClose={closeForm} handleSubmit={handleFormSubmit} initialData={formInitialData} />
      <ConfirmDialog open={isConfirmOpen} handleClose={closeConfirm} handleConfirm={() => handleDelete(userToDelete)} title="Delete User" description="Are you sure you want to delete this user?" />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserManagement;
