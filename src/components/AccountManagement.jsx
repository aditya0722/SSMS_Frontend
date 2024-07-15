import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import AccountForm from './AccountForm';

const initialData = [
    { id: 1, description: 'Salary', amount: 5000, category: 'salary', date: '2024-01-15' },
    { id: 2, description: 'Bonus', amount: 1500, category: 'bonus', date: '2024-03-20' },
    { id: 3, description: 'Groceries', amount: -200, category: 'groceries', date: '2024-01-10' },
    { id: 4, description: 'Utilities', amount: -100, category: 'utilities', date: '2024-02-05' },
    // Add more initial data as needed
];

const AccountManagement = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [transactions, setTransactions] = useState(initialData);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
    const [isExpenditureDialogOpen, setIsExpenditureDialogOpen] = useState(false);
    const [editData, setEditData] = useState(null);

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
        if (transaction.amount >= 0) {
            setIsIncomeDialogOpen(true);
        } else {
            setIsExpenditureDialogOpen(true);
        }
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };

    const handleIncomeSubmit = (transaction) => {
        if (editData) {
            setTransactions(transactions.map(t => t.id === editData.id ? transaction : t));
        } else {
            setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }]);
        }
    };

    const handleExpenditureSubmit = (transaction) => {
        if (editData) {
            setTransactions(transactions.map(t => t.id === editData.id ? transaction : t));
        } else {
            setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }]);
        }
    };

    const monthlyData = (type) => {
        const months = Array(12).fill(0);
        transactions
            .filter(t => t.amount >= (type === 'income' ? 0 : -Infinity) && new Date(t.date).getFullYear() === year)
            .forEach(t => {
                const month = new Date(t.date).getMonth();
                months[month] += type === 'income' ? t.amount : -t.amount;
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

    const incomePieData = {
        labels: ['Salary', 'Bonus', 'Other'],
        datasets: [
            {
                label: 'Income Sources',
                data: [
                    transactions.filter(t => t.category === 'salary' && t.amount >= 0).reduce((acc, t) => acc + t.amount, 0),
                    transactions.filter(t => t.category === 'bonus' && t.amount >= 0).reduce((acc, t) => acc + t.amount, 0),
                    transactions.filter(t => t.category === 'other' && t.amount >= 0).reduce((acc, t) => acc + t.amount, 0),
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'],
            },
        ],
    };

    const expenditurePieData = {
        labels: ['Groceries', 'Utilities', 'Other'],
        datasets: [
            {
                label: 'Expenditure Sources',
                data: [
                    transactions.filter(t => t.category === 'groceries' && t.amount < 0).reduce((acc, t) => acc + t.amount, 0),
                    transactions.filter(t => t.category === 'utilities' && t.amount < 0).reduce((acc, t) => acc + t.amount, 0),
                    transactions.filter(t => t.category === 'other' && t.amount < 0).reduce((acc, t) => acc + t.amount, 0),
                ],
                backgroundColor: ['rgba(255, 205, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            },
        ],
    };

    return (
        <>
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
                        <Box mb={10} height={200}>
                            <Typography variant="h6" gutterBottom>Income Distribution</Typography>
                            <Pie data={incomePieData} />
                        </Box>
                        <Box mb={10} height={200}>
                            <Typography variant="h6" gutterBottom>Expenditure Distribution</Typography>
                            <Pie data={expenditurePieData} />
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.filter(t => new Date(t.date).getFullYear() === year).map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell style={{ color: transaction.amount >= 0 ? 'green' : 'red' }}>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.category}</TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEditTransaction(transaction)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteTransaction(transaction.id)}>
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
