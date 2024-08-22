import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import { Container, Typography,Snackbar,Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import AccountForm from './AccountForm';
import ProgressBar from './ProgressBar';
import axios from "axios";
import Spinner from './Spinner';
import ConfirmDialog from './ConfirmDialog';

const AccountManagement = () => {
    const [progressLoading, setProgressLoading] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
const [transactions, setTransactions] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
    const [isExpenditureDialogOpen, setIsExpenditureDialogOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
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

    const handleAddIncome = () => {
        setEditData(null);
        setIsIncomeDialogOpen(true);
    };

    const handleAddExpenditure = () => {
        setEditData(null);
        setIsExpenditureDialogOpen(true);
    };

    const handleEditTransaction = (transaction) => {
        setEditData(transaction);
        if (transaction.ammount >= 0) {
            setIsIncomeDialogOpen(true);
        } else {
            setIsExpenditureDialogOpen(true);
        }
    };

    const handleDeleteTransaction = async(id) => {
        setLoading(true)
        try{
            await axios.delete(`https://ssmss-backend.onrender.com/api/deletetransaction/${id}`);
            const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
            setTransactions(response.data.data);
            setSnackbar({ open: true, message: 'Item Updated Successfully!', severity: 'success' });
            setLoading(false)
            setIsConfirmOpen(false)
        }
        catch(e){
            console.log(e)
            setLoading(false)
            setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
            setIsConfirmOpen(false)
        }
        finally{
            setLoading(false)
            setIsConfirmOpen(false)
        }
        setLoading(false)
        setIsConfirmOpen(false)
    };

    const handleIncomeSubmit = async(transaction) => {
        setLoading(true);
        transaction.type = "Income";
        console.log(transaction)
        if (editData) {
            try{
                await axios.put(`https://ssmss-backend.onrender.com/api/UpdateTransaction/${editData._id}`, transaction);
                setSnackbar({ open: true, message: 'Transaction Updated Successfully!', severity: 'success' });
                const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
                setTransactions(response.data.data);
                setLoading(false);
            }
            catch(e){
                console.log(e)
                
                setSnackbar({ open: true, message:e.response.data.msg, severity: 'error' });
                setLoading(false);
            }
            finally{
                setLoading(false);
            }
            
                
        } else {
            console.log(transaction)
            try{
                await axios.post("https://ssmss-backend.onrender.com/api/addTransaction",transaction);
                console.log("success");
                
                const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
                setTransactions(response.data.data);
                setSnackbar({ open: true, message: 'Transaction Added Successfully!', severity: 'success' });
            }catch(e){
                setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
                console.log(e)
            }finally{
                setLoading(false);
            }
            
        }
        setLoading(false);
    };

    const handleExpenditureSubmit = async(transaction) => {
        setLoading(true);
        transaction.type = "Expenditure";
        if (editData) {
            try{
                await axios.put(`https://ssmss-backend.onrender.com/api/UpdateTransaction/${editData._id}`, transaction);
                const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
                setTransactions(response.data.data);
                setSnackbar({ open: true, message: 'Transaction Updated Successfully!', severity: 'success' });
            }
            catch(e){
                console.log(e)
                
                setSnackbar({ open: true, message:e.response.data.msg, severity: 'error' });
                setLoading(false);
            }
            finally{
                setLoading(false);
            }
        } else {
            console.log(transaction)
            try{
                await axios.post("https://ssmss-backend.onrender.com/api/addTransaction",transaction);
                console.log("success");
                const response= await axios.get("https://ssmss-backend.onrender.com/api/getAccountDetails");
                setTransactions(response.data.data);
                setSnackbar({ open: true, message: 'Transaction addres Successfully!', severity: 'success' });
            }catch(e){
                setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
                console.log(e)
            }finally{
                setLoading(false);
            }
            
        }
        setLoading(false);
    };
    const openConfirm = (id) => {
        setUserToDelete(id);
        setIsConfirmOpen(true);
      };
      const closeConfirm = () => {
        setIsConfirmOpen(false);
        setUserToDelete(null);
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
        const categories = type === 'income' ? ['Donations', 'Monthly', 'joiningFee', 'Other'] : ['Maintenance', 'Donations', 'Utilities', 'Other'];
    
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
                    backgroundColor: type === 'income'
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
                    <SidebarMenu collapsed={isSidebarCollapsed} />
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
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddIncome}>
                            Add Income
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<Add />} onClick={handleAddExpenditure} sx={{ ml: 2 }}>
                            Add Expenditure
                        </Button>
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.filter(t => new Date(t.date).getFullYear() === year).map((transaction) => (
                                        <TableRow key={transaction._id}>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell style={{ color: transaction.ammount >= 0 ? 'green' : 'red' }}>₹{transaction.ammount}</TableCell>
                                            <TableCell>{transaction.category}</TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>₹{transaction.balance}</TableCell>
                                            <TableCell>{transaction.name}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEditTransaction(transaction)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => openConfirm(transaction._id)}>
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
                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                                {snackbar.message}
                            </Alert>
                        </Snackbar>
                        <ConfirmDialog open={isConfirmOpen} handleClose={closeConfirm} handleConfirm={() => handleDeleteTransaction(userToDelete)} title="Delete Transaction" description="Are you sure you want to delete this Transaction?" />
            </div>
            <AccountForm
                open={isIncomeDialogOpen}
                handleClose={() => setIsIncomeDialogOpen(false)}
                handleSubmit={handleIncomeSubmit}
                initialData={editData}
                type="Income"
            />
            <AccountForm
                open={isExpenditureDialogOpen}
                handleClose={() => setIsExpenditureDialogOpen(false)}
                handleSubmit={handleExpenditureSubmit}
                initialData={editData}
                type="Expenditure"
            />
        </>
    );
};

export default AccountManagement;
