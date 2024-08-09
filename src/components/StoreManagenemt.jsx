import React, { useState, useEffect } from 'react';
import { Container, Box, Alert, Typography, Snackbar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ProductForm from './productForm';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import ConfirmDialog from './ConfirmDialog';
import axios from 'axios';

const StoreManagement = () => {
    const [products, setProducts] = useState([]);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formInitialData, setFormInitialData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [progressLoading, setProgressLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchItems = async () => {
            setProgressLoading(true);
            try {
                const response = await axios.get("https://ssmss-backend.onrender.com/api/store");
                if (isMounted) {
                    setProducts(response.data);
                    setProgressLoading(false);
                }
            } catch (e) {
                console.error(e);
                if (isMounted) {
                    setProgressLoading(false);
                }
            }
        };

        fetchItems();

        return () => {
            isMounted = false;
        };
    }, []);

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

    const handleFormSubmit = async (product) => {
        setLoading(true);
        let productId=null;
        productId=product._id;
        console.log(productId)
        try {
            if (productId!=null) {
                console.log("udpade")
                await axios.put(`https://ssmss-backend.onrender.com/api/updateItem/${product._id}`, product);
                setSnackbar({ open: true, message: 'Item Updated Successfully!', severity: 'success' });
            } else {
                console.log("insert")
                await axios.post("https://ssmss-backend.onrender.com/api/addItem", product);
                setSnackbar({ open: true, message: 'Item Added Successfully!', severity: 'success' });
            }
            const response = await axios.get("https://ssmss-backend.onrender.com/api/store");
            setProducts(response.data);
        } catch (e) {
            console.error(e);
            setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
        }
        setLoading(false);
        closeForm();
    };
   

    const handleAdd = () => {
        openForm();
    };

    const handleEdit = (id) => {
        const product = products.find(p => p._id === id);
        openForm(product);
    };

    const openConfirmDialog = (id) => {
        setDeleteId(id);
        setIsConfirmOpen(true);
    };

    const closeConfirmDialog = () => {
        setDeleteId(null);
        setIsConfirmOpen(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`https://ssmss-backend.onrender.com/api/deleteItem/${deleteId}`);
            const response = await axios.get("https://ssmss-backend.onrender.com/api/store");
            setProducts(response.data);
            setSnackbar({ open: true, message: 'Item Deleted Successfully!', severity: 'success' });
        } catch (e) {
            console.error(e);
            setSnackbar({ open: true, message: 'An error occurred!', severity: 'error' });
        }
        setLoading(false);
        closeConfirmDialog();
    };

    const barData = {
        labels: products.map(product => product.itemName),
        datasets: [{
            label: 'Stock Level',
            data: products.map(product => product.stock),
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
    };

    return (
        <>
       
            <Spinner loading={loading} />
            <ProgressBar loading={progressLoading} />
            <AdminNav toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex' }}>
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                    <SidebarMenu collapsed={isSidebarCollapsed} />
                </div>
                <Container>
                    <Box my={4}>
                        <Typography variant="h4" gutterBottom>Store Management</Typography>
                        <Box mb={4} display="flex" justifyContent="center">
                            <Box sx={{ maxWidth: '800px', width: '100%' }}>
                                <Bar data={barData} options={{ maintainAspectRatio: true }} />
                            </Box>
                        </Box>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>Add Product</Button>
                        <Button variant="contained" color="secondary" startIcon={<Add />} sx={{ml:5}}>Add Recipt</Button>
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Price per item</TableCell>
                                        <TableCell>Date of Added</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product, index) => (
                                        <TableRow key={product._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{product.itemName}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.addedAt}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => handleEdit(product._id)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => openConfirmDialog(product._id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                                {snackbar.message}
                            </Alert>
                        </Snackbar>
                        <ConfirmDialog open={isConfirmOpen} handleClose={closeConfirmDialog} handleConfirm={handleDelete} title="Delete Item" description="Are you sure you want to delete this item?" />
                    </Box>
                </Container>
            </div>
            <ProductForm
                open={isFormOpen}
                handleClose={closeForm}
                handleSubmit={handleFormSubmit}
                initialData={formInitialData}
            />
        </>
    );
};

export default StoreManagement;
