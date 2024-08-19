import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import UserSideBar from './UserSideBar';
import { Box, Grid,Container, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import {Link} from 'react-router-dom';
import ProgressBar from './ProgressBar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate =useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataset,setdataset]=useState({users:0,balance:0,blogs:0})
  const [transactions, setTransactions] = useState([]);
  const handleClick=(e)=>{
    e.preventDefault();
    navigate("/userAccountManagement")
  }

  useEffect(()=>{
        
    const getData= async()=>{
        
        try{
         const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
            setTransactions(response.data.data);
            
        }catch(e){
            console.log(e)
        }
       
    }
    getData();
    
   
},[])

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
  useEffect(()=>{
  const getdataset= async ()=>{
      try{
        const response= await axios.get("https://ssmss-backend.onrender.com/api/DashboardContant");
        setdataset(response.data.data)
      }
      catch(e){
        console.log(e)
  
      }

    }
    getdataset();
  },[]);
  const data = [
    { country: 'Russia', area: '17,075,200', population: '146,899,754' },
    { country: 'France', area: '640,679', population: '64,979,548' },
    { country: 'Germany', area: '357,114', population: '82,114,224' },
    { country: 'Portugal', area: '92,090', population: '10,329,506' },
  ];

  return (
    <div>
        <ProgressBar loading={loading} />
      <AdminNav toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex' }}>
        <div className={` transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0   -mx-10' : 'translate-x-0'}`}>
          <UserSideBar collapsed={isSidebarCollapsed} />
        </div>
        <Container sx={{ flexGrow: 1, p: 3, backgroundColor: '#e3f2fd', minHeight: '100vh' }} >
          <Typography variant="h4" gutterBottom>
            User Dashboard
          </Typography>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6} md={3}>
            <Link to="/users">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <PeopleIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <div>
                  <Typography variant="h6">No. of Members</Typography>
                  <Typography variant="h5" textAlign={"center"}>{dataset.users}</Typography>
                </div>
              </Paper>
              </Link>
            </Grid>
           
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/userAccountManagement">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <AccountBalanceIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <div>
                  <Typography variant="h6">Total Balance</Typography>
                  <Typography variant="h5" textAlign={"center"}>{dataset.balance}</Typography>
                </div>
              </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/userBlogManagement">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center'  }}>
                <BarChartIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <div>
                <Typography variant="h6">Blog Report</Typography>
                <Typography variant="h5" textAlign={"center"}>{dataset.blogs}</Typography>
                </div>
              </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Link to="/userStoreManagenemt">
              <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center'  }}>
                <PieChartIcon fontSize="large" sx={{ color: '#1976d2', mr: 2 }} />
                <Typography variant="h6">Storage Breakdown</Typography>
              </Paper>
              </Link>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center',margin:'20px' }}>
            <Button variant="contained" color="primary" onClick={handleClick}>View Complete Report</Button>
          </Box>
  
            <Grid item xs={12} md={6} sx={{width:'100%'}}>
              <Paper elevation={3} sx={{ p: 2,width:'100%' }} >
                <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        
                                        <TableCell>Description</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Balance</TableCell>
                                        <TableCell>Member</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions && (transactions.map((transaction)=>{
                                      const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB');
                                        return(
                                        <TableRow key={transaction._id}>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell style={{ color: transaction.ammount >= 0 ? 'green' : 'red' }}>{transaction.ammount}</TableCell>
                                            <TableCell>{transaction.category}</TableCell>
                                            <TableCell>{formattedDate}</TableCell>
                                            <TableCell>{transaction.balance}</TableCell>
                                            <TableCell>{transaction.name}</TableCell>
                                            
                                        </TableRow>
                                        )
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
              </Paper>
            </Grid>
            
         
         
           
        </Container>
      </div>
    </div>
  );
}

export default AdminDashboard;
