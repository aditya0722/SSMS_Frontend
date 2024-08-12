import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AdminNav from './AdminNav';
import UserSideBar from './UserSideBar';
import UserForm from './UserForm';
import ConfirmDialog from './ConfirmDialog';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import axios from 'axios';
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  // Add more initial users as needed
];

const UserManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("https://ssmss-backend.onrender.com/api/login/members");
          setUsers(data);
          console.log(data)
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

  

  return (
    <>
    <ProgressBar loading={loading} />
      <Spinner loading={loading} />
      <AdminNav toggleSidebar={toggleSidebar} />
      <div className='flex h-auto'>
        <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
          <UserSideBar collapsed={isSidebarCollapsed} />
        </div>
        <Container >
          <Box my={4}>
            <Typography variant="h4" gutterBottom>User Management</Typography>
            <Box mb={4} p={2} border={1} borderColor="grey.300" borderRadius={4}>
              <Typography variant="h6">Number of Users: {users.length}</Typography>
            </Box>
           
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </div>
      
    
    </>
  );
};

export default UserManagement;
