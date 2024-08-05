import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ReceiptForm from './ReceiptForm';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import ConfirmDialog from './ConfirmDialog';
import { Container, TableCell, TableBody, Typography, TableRow, TableContainer, Table, TableHead, Snackbar, Alert, Dialog, DialogActions, Button, Card, CardContent, CardActions, DialogTitle, DialogContent, Paper, TextField, IconButton, Box } from '@mui/material';
import { Add, Visibility, Delete, AddCircle, RemoveCircle } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const initialReceipts = [
    {
        id: 1,
        name: "Aditya Sharma",
        address: "Gelling",
        contactNumber: "382189",
        totalAmount: 3200,
        status: "Returned",
        items: [
            { name: 'Plate', price: 10, quantity: 30, broken: 2, checked: true },
            { name: 'Glass', price: 10, quantity: 30, broken: 2, checked: true }
        ]
    }
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
    const [returnDetails, setReturnDetails] = useState({});
    const [mainID,setmainID] = useState("")
    const [isReturned,setisReturned]=useState();
    const [isreceiptReturned,setisreceiptReturned]=useState(false)

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
    useEffect(()=>{
        const getAllReceipt=async()=>{
            try{
                setLoading(true)
                const response = await axios.get("https://ssmss-backend.onrender.com/api/receipt");
                setReceipts(response.data)
                

            }
            catch(e){
                console.log(e)
            }
            finally{
                setLoading(false)
            }
            
        }
        getAllReceipt();
    },[])

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
    const closeConfirmDialog = () => {
        
        setIsConfirmOpen(false);
    };


    const handleAddReceipt = async (receipt) => {
        console.log(receipt)
        try{
            setLoading(true)
            await axios.post("https://ssmss-backend.onrender.com/api/savereceipt",receipt)
            const response = await axios.get("https://ssmss-backend.onrender.com/api/receipt");
                setReceipts(response.data)
            setSnackbar({ open: true, message: 'Receipt added successfully', severity: 'success' });
            
        }
        catch(error){
            console.log(error)
            setSnackbar({ open: true, message: 'Internal Server Error', severity: 'error' });
        }
        finally{
            setLoading(false)
            closeForm();
        }
        
    };

    const handleUpdateReceipt = (updatedReceipt) => {
        setReceipts(receipts.map(r => (r.id === updatedReceipt.id ? updatedReceipt : r)));
        setSnackbar({ open: true, message: 'Receipt updated successfully', severity: 'success' });
        closeForm();
    };

    const handleDeleteReceipt = async () => {
        console.log(receiptToDelete)
        let id =receiptToDelete;
        try{
            setLoading(true)
            await 
            axios.delete(`https://ssmss-backend.onrender.com/api/deletereceipt/${id}`)
            const response = await axios.get("https://ssmss-backend.onrender.com/api/receipt");
                setReceipts(response.data)
            setSnackbar({ open: true, message: 'Receipt deleted successfully', severity: 'success' });
        }
        catch(error){
            console.log(error)
            setSnackbar({ open: true, message: 'Error Please Try Again!', severity: 'error' });
        }
        finally{
            setLoading(false)
            setIsConfirmOpen(false);
        }
       
        
        
    };

    const openDetailDialog = (receipt) => {
        setSelectedReceipt(receipt);
        setReturnDetails(receipt.items.reduce((acc, item) => ({
            ...acc,
            [item.name]: { broken: item.broken, checked: item.checked }
        }), {}));
        if(receipt.status==="Returned"){
            setisreceiptReturned(true)
        }
        else{
            setisreceiptReturned(false)
        }
        setIsDetailOpen(true);
    };

    const closeDetailDialog = () => {
        setSelectedReceipt(null);
        setIsDetailOpen(false);
    };

    const handleReturnDetailsChange = ( id,itemName,field, value) => {
        setReturnDetails(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                [field]: value
            }
        }));
        setmainID(id)
    
    };
    
    const handleIncrementBroken = (itemName) => {
        setReturnDetails((prev) => {
            // Find the item in the selectedReceipt.items array
            const item = selectedReceipt.items.find(i => i.name === itemName);
    
            // Ensure the item exists in the selectedReceipt
            if (!item) {
                console.warn(`Item "${itemName}" not found in selectedReceipt.items.`);
                return prev; // No update if the item doesn't exist in selectedReceipt.items
            }
    
            const currentBroken = prev[itemName]?.broken || 0;
            const itemQuantity = item.quantity || 0;
    
            if (currentBroken < itemQuantity) {
                return {
                    ...prev,
                    [itemName]: {
                        ...prev[itemName],
                        broken: currentBroken + 1
                    }
                };
            }
    
            return prev; // No update if the broken count is not less than the quantity
        });
    };
    
    

    const handleDecrementBroken = (itemName) => {
        setReturnDetails(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                broken: Math.max((prev[itemName]?.broken || 0) - 1, 0)
            }
        }));
    };

    const handleSubmitReturnDetails = async () => {
        if (!selectedReceipt) return;
      
        const updatedItems = selectedReceipt.items.map(item => ({
          ...item,
          broken: returnDetails[item.name]?.broken || item.broken,
          checked: returnDetails[item.name]?.checked !== undefined ? returnDetails[item.name]?.checked : item.checked
        }));
      
        const updatedReceipt = {
          ...selectedReceipt,
          items: updatedItems,
          status: 'Returned' 
        };
    
        try {
            setLoading(true)
          await axios.put(`https://ssmss-backend.onrender.com/api/updatereceipt/${selectedReceipt._id}`, updatedReceipt);
          const response = await axios.get("https://ssmss-backend.onrender.com/api/receipt");
                setReceipts(response.data)
          setSnackbar({ open: true, message: 'Return details submitted successfully', severity: 'success' });
        } catch (error) {
          console.log(error);
          setSnackbar({ open: true, message: 'Failed to submit return details', severity: 'error' });
        } finally {
            setLoading(false)
          closeDetailDialog();
        }
      };
      

    const calculateBrokenCost = () => {
        if (!selectedReceipt) return 0;
        return selectedReceipt.items.reduce((total, item) => {
            const brokenCount = returnDetails[item.name]?.broken || item.broken;
            return total + (brokenCount * item.price);
        }, 0);
    };

    const calculateGrandTotal = () => {
        if (!selectedReceipt) return 0;
    
        // Convert values to numbers to ensure correct arithmetic operation
        const rentCost = parseFloat(selectedReceipt.totalAmount) || 0;
        const brokenCost = calculateBrokenCost() || 0;
    
        return rentCost + brokenCost;
    };


    



    
    const generatePDF = (receipt) => {
        const doc = new jsPDF();
    
        // Title
        doc.setFontSize(18);
        doc.setTextColor(40, 116, 166); // Set text color to blue
        doc.text('Samsing Sawali Manav Sanskar Samiti', 105, 20, null, null, 'center');
    
        // Receipt ID
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text(`Receipt ID: ${receipt._id}`, 20, 30);
    
        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35); // Horizontal line
    
        // User Details
        doc.setFontSize(12);
        doc.text(`Name: ${receipt.name}`, 20, 40);
        doc.text(`Address: ${receipt.address}`, 20, 45);
        doc.text(`Contact Number: ${receipt.contactNumber}`, 20, 50);
        doc.text(`Status: ${receipt.status}`, 20, 55);
    
        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, 60, 190, 60); // Horizontal line
    
        // Table Headers
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Item Name', 20, 65);
        doc.text('Quantity', 80, 65);
        doc.text('Price', 120, 65);
        doc.text('Broken', 160, 65);
    
        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, 70, 190, 70); // Horizontal line
    
        // Table Content
        let yPos = 75;
        let brokenPrice = 0;
        receipt.items.forEach((item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemBroken = parseFloat(item.broken) || 0;
    
            doc.setTextColor(0, 0, 0); // Set text color to black
            doc.text(item.name, 20, yPos);
            doc.text(item.quantity.toString(), 80, yPos, null, null, 'right');
            doc.text(itemPrice.toFixed(2), 120, yPos, null, null, 'right');
            doc.text(itemBroken.toString(), 160, yPos, null, null, 'right');
    
            // Calculate broken price
            brokenPrice += itemPrice * itemBroken;
    
            // Line Separator for each row
            doc.setLineWidth(0.2);
            doc.line(20, yPos + 5, 190, yPos + 5); // Horizontal line
    
            yPos += 10;
        });
    
        // Total Calculation
        const rentCost = parseFloat(receipt.totalAmount) || 0;
        const brokenCost = brokenPrice || 0;
        const grandTotal = rentCost + brokenCost;
    
        // Line Separator
        doc.setLineWidth(0.5);
        doc.line(20, yPos + 5, 190, yPos + 5); // Horizontal line
    
        // Total Amounts
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0); // Set text color to red
        doc.text(`Total Rent: ${rentCost.toFixed(2)}`, 20, yPos);
        doc.text(`Total Broken Items Cost: ${brokenCost.toFixed(2)}`, 20, yPos + 10);
        doc.text(`Grand Total: ${grandTotal.toFixed(2)}`, 20, yPos + 20);
    
        // Additional Note
        yPos += 35;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Note:', 20, yPos);
        doc.setFontSize(10);
        doc.text('This receipt does not require a signature.', 20, yPos + 5);
    
        // Save PDF
        doc.save(`receipt_${receipt.name}.pdf`);
    };
    

    
    return (
        <>

         <Spinner loading={loading}/>
        <AdminNav toggleSidebar={toggleSidebar} />
        <ProgressBar loading={loading}/>
        <ReceiptForm
                open={isFormOpen}
                initialData={formInitialData}
                onClose={closeForm}
                onSave={formInitialData ? handleUpdateReceipt : handleAddReceipt}
        />
        <div style={{ display: 'flex' }}>
            <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                <SidebarMenu collapsed={isSidebarCollapsed} />
            </div>
            <Container sx={{ minHeight: "100vh" }}>
                <Typography variant="h3" gutterBottom>Receipt Management Page</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openForm()}
                    startIcon={<Add />}
                >
                    Add Receipt
                </Button>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                    {receipts.map(receipt => (
                        <Card key={receipt.id} style={{ width: '350px', margin: '10px', background: receipt.status === 'Taken' ? '#C8E6C9' : '#FFF69B' }}>
                            <CardContent>
                                <Box>
                                    <Typography variant="h4"><b>{receipt.name}</b></Typography><br />
                                    <Typography variant="h6"><b>Address: </b>{receipt.address}</Typography>
                                    <Typography variant="h6"><b>Contact: </b>{receipt.contactNumber}</Typography>
                                    <Typography variant="h6"><b>Total Amount: </b>{receipt.totalAmount}</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">Status: {receipt.status}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<Visibility />}
                                    onClick={() => openDetailDialog(receipt)}
                                >
                                    Details
                                </Button>
                                <Button
                                    size="small"
                                    color="secondary"
                                    startIcon={<Delete />}
                                    onClick={() => {
                                        setReceiptToDelete(receipt._id);
                                        setIsConfirmOpen(true);
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => generatePDF(receipt)}
                                    startIcon={<Add />}
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Download
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
        <ConfirmDialog open={isConfirmOpen} 
        handleClose={closeConfirmDialog} 
        handleConfirm={handleDeleteReceipt} 
        title="Delete Receipt" 
        description="Are you sure you want to delete this Receipt?" />
        
        <Dialog open={isDetailOpen} onClose={closeDetailDialog} maxWidth="md" fullWidth>
            <DialogTitle style={{ backgroundColor: '#1976d2', color: 'white' }}>Receipt Details</DialogTitle>
            <DialogContent style={{ backgroundColor: '#e3f2fd' }}>
                {selectedReceipt && (
                    <>
                        <Typography variant="h5" gutterBottom color="primary" mt={3}>
                            Samsing Sawali Manav Sanskar Samiti
                        </Typography>
                        <Box style={{ padding: '16px', borderRadius: '8px' }}>
                            <Typography variant="h6" gutterBottom color="primary">
                                {`Receipt ID: ${selectedReceipt._id}`}
                            </Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary">
                                {`Name: ${selectedReceipt.name}`}
                            </Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary">
                                {`Address: ${selectedReceipt.address}`}
                            </Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary">
                                {`Contact Number: ${selectedReceipt.contactNumber}`}
                            </Typography>
                        </Box>
                        <TableContainer component={Paper} style={{ marginTop: '16px', backgroundColor: '#ffffff' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Broken</TableCell>
                                        <TableCell>Check</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedReceipt.items.map((item) => (
                                        <TableRow key={item.name}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>
                                                
                                                    <div classNmae='md: flex'>
                                                        {!isreceiptReturned && (
                                                        <IconButton onClick={() => handleIncrementBroken(item.name)} color="primary">
                                                            <AddCircle />
                                                        </IconButton>
                                                        )}
                                                        {returnDetails[item.name]?.broken || item.broken}
                                                        {!isreceiptReturned && (
                                                        <IconButton onClick={() => handleDecrementBroken(item.name)} color="secondary">
                                                            <RemoveCircle />
                                                        </IconButton>
                                                         )}
                                                    </div>
                                              
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={returnDetails[item.name]?.checked || item.checked}
                                                    onChange={(e) => handleReturnDetailsChange(selectedReceipt._id,item.name, 'checked', e.target.checked)}
                                                    className="h-6 w-6"
                                                    disabled={isReturned} // Disable checkbox if status is 'Returned'
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box style={{ padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
                            <Typography variant="body1" gutterBottom sx={{ color: "red" }}>
                                {`Total Broken Items Cost: ${calculateBrokenCost()}`}
                            </Typography>
                            <Typography variant="body1" gutterBottom color="primary">
                                {`Grand Total: ${calculateGrandTotal()}`}
                            </Typography>
                        </Box>
                    </>
                )}
            </DialogContent>
            <DialogActions className="text-blue-600">
                <Button onClick={closeDetailDialog} style={{ color: 'blue' }}>
                    Cancel
                </Button>
                {!isreceiptReturned && (
                    <Button onClick={handleSubmitReturnDetails} style={{ color: 'red' }}>
                        Submit
                    </Button>
                )}
            </DialogActions>
        </Dialog>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    </>
    );
};

export default ItemsReceiptManagement;
