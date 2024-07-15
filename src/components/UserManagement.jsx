import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import UserForm from './UserForm';
import ConfirmDialog from './ConfirmDialog';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  // Add more initial users as needed
];

const UserManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarCollapsed(mobile); // Collapse sidebar on mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const openForm = (initialData = null) => {
    setFormInitialData(initialData);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormInitialData(null);
  };

  const handleFormSubmit = (user) => {
    if (user.id) {
      setUsers(users.map(u => u.id === user.id ? user : u));
      setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
    } else {
      user.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, user]);
      setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
    }
  };

  const handleAdd = () => {
    openForm();
  };

  const handleEdit = (id) => {
    const user = users.find(u => u.id === id);
    openForm(user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
    setIsConfirmOpen(false);
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
      <AdminNav toggleSidebar={toggleSidebar} />
      <div className='flex h-screen'>
        <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
          <SidebarMenu collapsed={isSidebarCollapsed} />
        </div>
        <Container>
          <Box my={4}>
            <Typography variant="h4" gutterBottom>User Management</Typography>
            <Box mb={4} p={2} border={1} borderColor="grey.300" borderRadius={4}>
              <Typography variant="h6">Number of Users: {users.length}</Typography>
            </Box>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd} sx={{ mb: 2 }}>
              Add User
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => openConfirm(user.id)}>
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
      <UserForm
        open={isFormOpen}
        handleClose={closeForm}
        handleSubmit={handleFormSubmit}
        initialData={formInitialData}
      />
      <ConfirmDialog
        open={isConfirmOpen}
        handleClose={closeConfirm}
        handleConfirm={() => handleDelete(userToDelete)}
        title="Delete User"
        description="Are you sure you want to delete this user?"
      />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserManagement;
