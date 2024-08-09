import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import UserSideBar from './UserSideBar';
import { Container, Typography,Snackbar,Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ProgressBar from './ProgressBar';
import axios from "axios";
import Spinner from './Spinner';


const UserAccountManagement = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
   
    const [loading, setLoading] = useState(false);
   
    useEffect(()=>{
        
        const getData= async()=>{
            setLoading(true);
            try{
             const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
                setTransactions(response.data.data);
                console.log(transactions)
            }catch(e){
                console.log(e)
            }
            setLoading(false);
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

   


      const monthlyData = (type) => {
        const months = Array(12).fill(0);
        transactions
            .filter(t => (type === 'income' ? t.ammount >= 0 : t.ammount < 0) && new Date(t.date).getFullYear() === year)
            .forEach(t => {
                const month = new Date(t.date).getMonth();
                months[month] += type === 'income' ? t.ammount : -t.ammount;
            });
        return months;
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Income',
                data: monthlyData('income'),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Expenditure',
                data: monthlyData('expenditure'),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const pieData = (type) => {
        const categories = type === 'Income' ? ['Donations', 'Monthly', 'joiningFee', 'Other'] : ['Maintenance', 'Donations', 'Utilities', 'Other'];
    
        // Convert type to uppercase for comparison consistency
        const normalizedType = type.toUpperCase();
    
        console.log(`Generating pie data for type: ${type}`);
        console.log('Transactions:', transactions);
    
        const data = categories.map(category => {
            const normalizedCategory = category.toUpperCase();
            const filteredTransactions = transactions.filter(t => {
                const isCategoryMatch = t.category.toUpperCase() === normalizedCategory;
                const isTypeMatch = t.type.toUpperCase() === normalizedType;
                console.log(`Transaction: ${JSON.stringify(t)}, Category Match: ${isCategoryMatch}, Type Match: ${isTypeMatch}`);
                return isCategoryMatch && isTypeMatch;
            });
    
            console.log(`Filtered Transactions for ${category}:`, filteredTransactions);
    
            return filteredTransactions.reduce((acc, t) => acc + t.ammount, 0);
        });
    
        console.log(`Data for ${type} Pie Chart:`, data);
    
        return {
            labels: categories.map(category => category.charAt(0).toUpperCase() + category.slice(1)),
            datasets: [
                {
                    label: `${type.charAt(0).toUpperCase() + type.slice(1)} Sources`,
                    data: data,
                    backgroundColor: type === 'Income'
                        ? ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(225,140,120,0.5)']
                        : ['rgba(255, 205, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(153, 102, 255, 0.5)'],
                },
            ],
        };
    };
    
    
    
    
  
    return (
        <>
          <ProgressBar loading={loading} />
          <Spinner loading={loading} />
            <AdminNav toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex' }}>
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                    <UserSideBar collapsed={isSidebarCollapsed} />
                </div>
                <Container>
                    <Box my={4}>
                        <Typography variant="h4" gutterBottom>Accounts Management</Typography>
                        <Box  height={220} width="99%" mb={10}>
                            <Select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                {[...Array(10)].map((_, i) => (
                                    <MenuItem key={i} value={new Date().getFullYear() - i}>
                                        {new Date().getFullYear() - i}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Bar data={barData} options={{ maintainAspectRatio: false }}/>
                        </Box>
                        <Box className="flex space-evenly">
                        <Box mb={10} height={200}>
                            <Typography variant="h6" gutterBottom>Income Distribution</Typography>
                            <Pie data={pieData('income')} />
                        </Box>
                        <Box mb={10} height={200}>
                            <Typography variant="h6" gutterBottom>Expenditure Distribution</Typography>
                            <Pie data={pieData('expenditure')} />
                        </Box>
                        </Box>
                        
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
                                    {transactions.filter(t => new Date(t.date).getFullYear() === year).map((transaction) => (
                                        <TableRow key={transaction._id}>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell style={{ color: transaction.ammount >= 0 ? 'green' : 'red' }}>{transaction.ammount}</TableCell>
                                            <TableCell>{transaction.category}</TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>{transaction.balance}</TableCell>
                                            <TableCell>{transaction.name}</TableCell>
                                           
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

export default UserAccountManagement;
