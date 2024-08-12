import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import AdminNav from './AdminNav';
import UserSideBar from './UserSideBar';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import axios from 'axios';

const initialData = [
    { id: 1, name: 'Product 1', stock: 50, price: 10.00 },
    { id: 2, name: 'Product 2', stock: 30, price: 15.00 },
    // Add more initial data as needed
];

const StoreManagement = () => {
    //const [initialData, setinitialData] = useState([])
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState(initialData);
    const [loading, setLoading] = useState(false);


    useEffect(() => {


        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/api/store");
               
                    setProducts(response.data);
                    setLoading(false);
                
            } catch (e) {
                console.error(e);
                
                    setLoading(false);
                
            }
        };

        fetchItems();


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
            <ProgressBar loading={loading} />
            <AdminNav toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex' }}>
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                    <UserSideBar collapsed={isSidebarCollapsed} />
                </div>
                <Container>
                    <Box my={4}>
                        <Typography variant="h4" gutterBottom>Store Management</Typography>
                        <Box mb={4} display="flex" justifyContent="center">
                            <Box sx={{ maxWidth: '800px', width: '100%' }}>
                                <Bar data={barData} options={{ maintainAspectRatio: true }} />
                            </Box>
                        </Box>
                       
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{backgroundColor:'skyblue'}}>
                                    <TableCell>ID</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Price per item</TableCell>
                                        <TableCell>Date of Added</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product,index) => (
                                        <TableRow style={{backgroundColor:index%2==0 ? '':'whitesmoke'}} key={product.id} >
                                          
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{product.itemName}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.addedAt}</TableCell>
                                           
                                       
                                            
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

export default StoreManagement;
