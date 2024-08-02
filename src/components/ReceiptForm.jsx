import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const ReceiptForm = ({ open, onClose, onSave, initialData }) => {
    const [receipt, setReceipt] = useState({ items: [], status: 'Taken', name: '', address: '', contactNumber: '', totalAmount: 0 });
    const [stockData, setStockData] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setReceipt(initialData);
        } else {
            setReceipt({ items: [], status: 'Taken', name: '', address: '', contactNumber: '', totalAmount: 0 });
        }

        const fetchStockData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/store");
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
    }, [initialData, open]);

    const handleItemChange = (e, index) => {
        const itemName = e.target.value;
        const selectedItem = stockData.find(item => item.itemName === itemName);

        const items = receipt.items.map((item, i) => (
            i === index 
            ? { 
                ...item, 
                name: selectedItem.itemName, 
                price: selectedItem.price, 
                stock: selectedItem.stock,
                quantity: '',
                broken: '' 
            } 
            : item
        ));
        setReceipt(prev => ({ ...prev, items }));
        updateTotal(items);
    };

    const handleChange = (e, index, field) => {
        const value = e.target.value;
        const items = receipt.items.map((item, i) => {
            if (i === index) {
                if (field === 'quantity') {
                    const quantity = parseInt(value, 10);
                    if (quantity < 1 || quantity > item.stock) {
                        return { ...item, [field]: item[field] };
                    }
                }
                return { ...item, [field]: value };
            }
            return item;
        });
        setReceipt(prev => ({ ...prev, items }));
        updateTotal(items);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setReceipt(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        const newItems = [...receipt.items, { name: '', price: '', stock: '', quantity: '', broken: '' }];
        setReceipt(prev => ({ ...prev, items: newItems }));
        updateTotal(newItems);
    };

    const removeItem = (index) => {
        const items = receipt.items.filter((_, i) => i !== index);
        setReceipt(prev => ({ ...prev, items }));
        updateTotal(items);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = receipt.name ? "" : "Name is required.";
        tempErrors.address = receipt.address ? "" : "Address is required.";
        tempErrors.contactNumber = receipt.contactNumber ? "" : "Contact Number is required.";
        tempErrors.items = receipt.items.length > 0 ? "" : "At least one item is required.";
        
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const onSubmit = () => {
        if (validate()) {
            onSave(receipt);
        }
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            const quantity = parseFloat(item.quantity) || 0;
            const price = parseFloat(item.price) || 0;
            return total + (quantity * price);
        }, 0).toFixed(2);
    };

    const updateTotal = (items) => {
        const total = calculateTotal(items);
        setReceipt(prev => ({ ...prev, totalAmount: total }));
    };

    const availableItems = stockData.filter(itemData => !receipt.items.some(item => item.name === itemData.itemName));

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Edit Receipt' : 'Add Receipt'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    fullWidth
                    value={receipt.name}
                    onChange={handleFieldChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    style={{ marginBottom: '10px' }}
                /> 
                <TextField
                    margin="dense"
                    name="address"
                    label="Address"
                    fullWidth
                    value={receipt.address}
                    onChange={handleFieldChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    style={{ marginBottom: '10px' }}
                /> 
                <TextField
                    margin="dense"
                    name="contactNumber"
                    label="Contact Number"
                    fullWidth
                    value={receipt.contactNumber}
                    onChange={handleFieldChange}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    style={{ marginBottom: '10px' }}
                /> 
                {receipt.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Select
                            margin="dense"
                            fullWidth
                            value={item.name}
                            onChange={(e) => handleItemChange(e, index)}
                            style={{ marginRight: '10px' }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {availableItems.map(stockItem => (
                                <MenuItem key={stockItem._id} value={stockItem.itemName}>
                                    {stockItem.itemName}
                                </MenuItem>
                            ))}
                            {item.name && (
                                <MenuItem value={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            )}
                        </Select>
                        <TextField
                            margin="dense"
                            name="price"
                            label="Price"
                            fullWidth
                            value={item.price}
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            margin="dense"
                            name="stock"
                            label="Stock"
                            fullWidth
                            value={item.stock}
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            margin="dense"
                            name="quantity"
                            label="Quantity"
                            fullWidth
                            value={item.quantity}
                            onChange={(e) => handleChange(e, index, 'quantity')}
                            error={parseInt(item.quantity) < 1 || parseInt(item.quantity) > item.stock}
                            helperText={parseInt(item.quantity) < 1 ? "Quantity cannot be less than 1" : parseInt(item.quantity) > item.stock ? "Quantity cannot be greater than stock" : ""}
                            style={{ marginRight: '10px' }}
                        />
                        {receipt.status === 'Return' && (
                            <TextField
                                margin="dense"
                                name="broken"
                                label="Broken"
                                fullWidth
                                value={item.broken}
                                onChange={(e) => handleChange(e, index, 'broken')}
                                style={{ marginRight: '10px' }}
                            />
                        )}
                        <IconButton onClick={() => removeItem(index)}>
                            <RemoveCircleOutline color="secondary" />
                        </IconButton>
                    </div>
                ))}
                {errors.items && <p style={{ color: 'red' }}>{errors.items}</p>}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addItem}
                    startIcon={<AddCircleOutline />}
                    style={{ marginBottom: '10px' }}
                >
                    Add Item
                </Button>
                <Typography variant="h6" align="right">
                    Total: ${receipt.totalAmount}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    {initialData ? 'Update' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReceiptForm;
