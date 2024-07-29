import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ReceiptForm from './ReceiptForm';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import ConfirmDialog from './ConfirmDialog';
import { Container, TableCell, TableBody, Typography, TableRow, TableContainer, Table, TableHead, Snackbar, Alert, Dialog, DialogActions, Button, Card, CardContent, CardActions, DialogTitle, DialogContent, Paper, TextField, IconButton, InputAdornment } from '@mui/material';
import { Add, Visibility, Delete, AddCircle, RemoveCircle } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const initialReceipts = [
    { id: 1, items: [{ name: 'Plate', price: 10, quantity: 30, broken: 2 }, { name: 'Chair', price: 50, quantity: 50, broken: 1 }], status: 'Pending' },
];

const ItemsReceiptManagement = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [progressLoading, setProgressLoading] = useState(false);
    const [receipts, setReceipts] = useState(initialReceipts);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formInitialData, setFormInitialData] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [receiptToDelete, setReceiptToDelete] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
    const [returnDetails, setReturnDetails] = useState({});

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
        setFormInitialData(null);
        setIsFormOpen(false);
    };

    const handleAddReceipt = (receipt) => {
        setReceipts([...receipts, { ...receipt, id: receipts.length + 1 }]);
        setSnackbar({ open: true, message: 'Receipt added successfully', severity: 'success' });
        closeForm();
    };

    const handleUpdateReceipt = (updatedReceipt) => {
        setReceipts(receipts.map(r => (r.id === updatedReceipt.id ? updatedReceipt : r)));
        setSnackbar({ open: true, message: 'Receipt updated successfully', severity: 'success' });
        closeForm();
    };

    const handleDeleteReceipt = () => {
        setReceipts(receipts.filter(r => r.id !== receiptToDelete));
        setSnackbar({ open: true, message: 'Receipt deleted successfully', severity: 'success' });
        setIsConfirmOpen(false);
    };

    const openDetailDialog = (receipt) => {
        setSelectedReceipt(receipt);
        setIsDetailOpen(true);
    };

    const closeDetailDialog = () => {
        setSelectedReceipt(null);
        setIsDetailOpen(false);
    };

    const handleReturnDetailsChange = (itemName, field, value) => {
        setReturnDetails(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                [field]: value
            }
        }));
    };

    const handleIncrement = (itemName) => {
        setReturnDetails(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                quantity: (prev[itemName]?.quantity || 0) + 1
            }
        }));
    };

    const handleDecrement = (itemName) => {
        setReturnDetails(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                quantity: Math.max((prev[itemName]?.quantity || 0) - 1, 0)
            }
        }));
    };

    const handleReturnDialogOpen = () => {
        setIsReturnDialogOpen(true);
    };

    const handleReturnDialogClose = () => {
        setIsReturnDialogOpen(false);
    };

    const handleSubmitReturnDetails = () => {
        // Logic to process return details
        console.log('Return Details Submitted:', returnDetails);
        handleReturnDialogClose();
    };

    const generatePDF = (receipt) => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.setTextColor(40, 116, 166); // Set text color to blue
        doc.text('Samsing Sawali Manav Sanskar Samiti', 20, 20);

        // Receipt ID
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text(`Receipt ID: ${receipt.id}`, 20, 30);

        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35); // Horizontal line

        // Table Headers
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Item Name', 20, 40);
        doc.text('Quantity', 80, 40);
        doc.text('Price', 120, 40);
        doc.text('Broken', 160, 40);

        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45); // Horizontal line

        // Table Content
        let yPos = 50;
        receipt.items.forEach((item) => {
            doc.setTextColor(0, 0, 0); // Set text color to black
            doc.text(item.name, 20, yPos);
            doc.text(item.quantity.toString(), 80, yPos);
            doc.text(item.price.toString(), 120, yPos);
            doc.text(item.broken.toString(), 160, yPos);

            // Line Separator for each row
            doc.setLineWidth(0.2);
            doc.line(20, yPos + 5, 190, yPos + 5); // Horizontal line

            yPos += 10;
        });

        // Total Calculation
        const total = receipt.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, yPos + 5, 190, yPos + 5); // Horizontal line

        // Total Amount
        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0); // Set text color to red
        doc.text(`Total: ${total}`, 20, yPos + 15);

        // Save PDF
        doc.save(`receipt_${receipt.id}.pdf`);
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
                <Container sx={{ minHeight: "100vh" }}>
                    <Typography variant="h3" gutterBottom>Receipt Management Page</Typography>
                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => openForm()}>
                        Add Receipt
                    </Button>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                        {receipts.map(receipt => (
                            <Card key={receipt.id} style={{ width: '300px', margin: '10px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">Receipt {receipt.id}</Typography>
                                    <Typography variant="body2" color="textSecondary">Status: {receipt.status}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" startIcon={<Visibility />} onClick={() => openDetailDialog(receipt)}>
                                        View Details
                                    </Button>
                                    <Button size="small" color="secondary" startIcon={<Delete />} onClick={() => { setReceiptToDelete(receipt.id); setIsConfirmOpen(true); }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>

                    {/* Return Details Dialog */}
                    <Dialog open={isReturnDialogOpen} onClose={handleReturnDialogClose}>
                        <DialogTitle>Return Details</DialogTitle>
                        <DialogContent>
                    {selectedReceipt && (
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="h6" align="center" gutterBottom style={{ color: '#00396b' }}>
                                Samsing Sawali Manav Sanskar Samiti
                            </Typography>
                            <Typography variant="subtitle1">Receipt ID: {selectedReceipt.id}</Typography>
                            <Typography variant="body2" color="textSecondary">Status: {selectedReceipt.status}</Typography>
                            <hr />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                                            <TableCell align="center"><strong>Item Name</strong></TableCell>
                                            <TableCell align="center"><strong>Quantity</strong></TableCell>
                                            <TableCell align="center"><strong>Price</strong></TableCell>
                                            <TableCell align="center"><strong>Broken</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedReceipt.items
                                            .filter(item => selectedReceipt.status !== 'Pending' || item.broken > 0)
                                            .map((item, index) => (
                                                <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                                    <TableCell align="center">{item.name}</TableCell>
                                                    <TableCell align="center">{item.quantity}</TableCell>
                                                    <TableCell align="center">{item.price}</TableCell>
                                                    <TableCell align="center"> <TextField
                                        label="Quantity"
                                        type="number"
                                        value={returnDetails[item.name]?.broken || 0}
                                        onChange={(e) => handleReturnDetailsChange(item.name, 'quantity', parseInt(e.target.value))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => handleIncrement(item.name)}><AddCircle /></IconButton>
                                                    <IconButton onClick={() => handleDecrement(item.name)}><RemoveCircle /></IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    /></TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <hr />
                            <Typography variant="h6" align="right" style={{ marginTop: '10px', color: '#00396b' }}>
                                Total: {selectedReceipt.items.reduce((total, item) => total + (item.price * item.quantity), 0)}
                            </Typography>
                            
                        </Paper>
                    )}
                </DialogContent>
                        <DialogActions>
                            <Button onClick={handleReturnDialogClose} color="primary">Cancel</Button>
                            <Button onClick={handleSubmitReturnDetails} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Form Component */}
                    {isFormOpen && (
                        <ReceiptForm
                            initialData={formInitialData}
                            onClose={closeForm}
                            onSave={formInitialData ? handleUpdateReceipt : handleAddReceipt}
                        />
                    )}

                    {/* Confirm Dialog */}
                    <ConfirmDialog
                        open={isConfirmOpen}
                        onClose={() => setIsConfirmOpen(false)}
                        onConfirm={handleDeleteReceipt}
                        title="Delete Receipt"
                        message="Are you sure you want to delete this receipt?"
                    />

                    {/* Details Dialog */}
                   <Dialog open={isDetailOpen} onClose={closeDetailDialog} fullWidth maxWidth="sm">
                <DialogTitle>Receipt Details</DialogTitle>
                <DialogContent>
                    {selectedReceipt && (
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="h6" align="center" gutterBottom style={{ color: '#00396b' }}>
                                Samsing Sawali Manav Sanskar Samiti
                            </Typography>
                            <Typography variant="subtitle1">Receipt ID: {selectedReceipt.id}</Typography>
                            <Typography variant="body2" color="textSecondary">Status: {selectedReceipt.status}</Typography>
                            <hr />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                                            <TableCell align="center"><strong>Item Name</strong></TableCell>
                                            <TableCell align="center"><strong>Quantity</strong></TableCell>
                                            <TableCell align="center"><strong>Price</strong></TableCell>
                                            <TableCell align="center"><strong>Broken</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedReceipt.items
                                            .filter(item => selectedReceipt.status !== 'Pending' || item.broken > 0)
                                            .map((item, index) => (
                                                <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                                    <TableCell align="center">{item.name}</TableCell>
                                                    <TableCell align="center">{item.quantity}</TableCell>
                                                    <TableCell align="center">{item.price}</TableCell>
                                                    <TableCell align="center">{item.broken}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <hr />
                            <Typography variant="h6" align="right" style={{ marginTop: '10px', color: '#00396b' }}>
                                Total: {selectedReceipt.items.reduce((total, item) => total + (item.price * item.quantity), 0)}
                            </Typography>
                            {selectedReceipt.status === 'Pending' && (
                                <Button variant="contained" color="secondary" onClick={handleReturnDialogOpen} style={{ marginTop: '10px' }}>
                                    Return
                                </Button>
                            )}
                        </Paper>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDetailDialog} color="primary">Close</Button>
                    <Button onClick={() => generatePDF(selectedReceipt)} color="primary">Download as PDF</Button>
                </DialogActions>
            </Dialog>
                </Container>
            </div>
        </>
    );
};

export default ItemsReceiptManagement;
