import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import UserSideBar from './UserSideBar';
import { Box, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  const data = [
    { country: 'Russia', area: '17,075,200', population: '146,899,754' },
    { country: 'France', area: '640,679', population: '64,979,548' },
    { country: 'Germany', area: '357,114', population: '82,114,224' },
    { country: 'Portugal', area: '92,090', population: '10,329,506' },
  ];

  return (
    <div>
      <AdminNav toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex' }}>
        <div className={` transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0   -mx-10' : 'translate-x-0'}`}>
          <UserSideBar collapsed={isSidebarCollapsed} />
        </div>
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#e3f2fd', minHeight: '100vh' }} >
          <Typography variant="h4" gutterBottom>
            User Dashboard
          </Typography>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6} md={3}>
            <Link to="/Users">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <PeopleIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <div>
                  <Typography variant="h6">No. of Members</Typography>
                  <Typography variant="h5">150</Typography>
                </div>
              </Paper>
              </Link>
            </Grid>
           
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/UserAccountManagement">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <AccountBalanceIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <div>
                  <Typography variant="h6">Total Balance</Typography>
                  <Typography variant="h5">$25,000</Typography>
                </div>
              </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/UserBlogManagement">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center'  }}>
                <BarChartIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <div>
                <Typography variant="h6">Blog Report</Typography>
                <Typography variant="h5">25</Typography>
                </div>
              </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Link to="/UserStoreManagenemt">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center'  }}>
                <PieChartIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <Typography variant="h6">Storage Breakdown</Typography>
              </Paper>
              </Link>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center',margin:'20px' }}>
           
          </Box>
  
            <Grid item xs={12} md={6} sx={{width:'100%'}}>
              <Paper elevation={3} sx={{ p: 2,width:'100%' }} >
                <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Area</TableCell>
                        <TableCell>Population</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell>{row.area}</TableCell>
                          <TableCell>{row.population}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            
         
         
           
        </Box>
      </div>
    </div>
  );
}

export default AdminDashboard;
