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
      try {
        setLoading(true);
        setFormLoading(true);
        const { data } = await axios.get("https://ssmss-backend.onrender.com/api/login/members");
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFormLoading(false);
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
    setFormInitialData(null);
    setIsFormOpen(false);
  };

  const generateOTP = () => {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  };

  const sendSMS = async (phoneNumber, otp) => {
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=OIdPDZthq96GBAHE0YfNcvMSzURVyunrs8Q7Km3xLXbTwg4opj1Q8oCBqVhjJf9HGZRtIngAvNrs563P&route=otp&variables_values=${otp}&flash=0&numbers=${phoneNumber}`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error('Error response:', error.response.data);
      console.error('Error message:', error.message);
    }
  };

  const handleAddUser = async (user) => {

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : value);
    });
    let otp = generateOTP();
    formData.append('password', otp);

    try {
      await axios.post("https://ssmss-backend.onrender.com/api/register", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      sendSMS(user.contact, otp);
      const { data } = await axios.get("https://ssmss-backend.onrender.com/api/login/members");
      setUsers(data);
      setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
    } catch (error) {
      console.log(error)
      let msg = error.response.data.data;
      setSnackbar({ open: true, message: `${msg}`, severity: 'error' });
      setFormLoading(false);
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
      await axios.put(`https://ssmss-backend.onrender.com/api/updateUser/${user._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
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

  const handleAdd = () => {
     console.log("add")   
    openForm()
  };
  const handleEdit = (user) => {
    console.log(user)   
    openForm(user);}
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ssmss-backend.onrender.com/api/deleteUser/${id}`);
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
                      <TableCell>{user.imageUrl ? (
                        <img src={user.imageUrl} alt="User" height="100" width="100" />
                      ) : (
                        <img src="https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg" alt="User" height="100" width="100" />
                      )}</TableCell>
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
      <ConfirmDialog open={isConfirmOpen} handleClose={closeConfirm} handleConfirm={() => handleDelete(userToDelete)} title="Delete User" description="Are you sure you want to delete this user?" />
      <UserForm open={isFormOpen} handleClose={closeForm} handleSubmit={handleFormSubmit} initialData={formInitialData} />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}        </Alert>
      </Snackbar>
    </>
  );
};

export default UserManagement;
