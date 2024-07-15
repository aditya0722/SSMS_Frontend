import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ProductForm from './productForm';

const initialData = [
    { id: 1, name: 'Product 1', stock: 50, price: 10.00 },
    { id: 2, name: 'Product 2', stock: 30, price: 15.00 },
    // Add more initial data as needed
];

const StoreManagement = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formInitialData, setFormInitialData] = useState(null);

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

    const handleFormSubmit = (product) => {
        if (product.id) {
            setProducts(products.map(p => p.id === product.id ? product : p));
        } else {
            product.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            setProducts([...products, product]);
        }
    };

    const handleAdd = () => {
        openForm();
    };

    const handleEdit = (id) => {
        const product = products.find(p => p.id === id);
        openForm(product);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const barData = {
        labels: products.map(product => product.name),
        datasets: [{
            label: 'Stock Level',
            data: products.map(product => product.stock),
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
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
                        <Typography variant="h4" gutterBottom>Store Management</Typography>
                        <Box mb={4} >
                            <Bar data={barData} options={{ maintainAspectRatio: false }}/>
                        </Box>
                        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>Add Product</Button>
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => handleEdit(product.id)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
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
