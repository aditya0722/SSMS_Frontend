import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent,TableContainer , DialogActions, TextField, Button, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const ReceiptForm = ({ open, handleClose, handleSubmit, initialData }) => {
    const [receipt, setReceipt] = useState({ items: [], status: 'Taken' });

    useEffect(() => {
        if (initialData) {
            setReceipt(initialData);
        } else {
            setReceipt({ items: [], status: 'Taken' });
        }
    }, [initialData]);

    const handleChange = (e, index, field) => {
        const value = e.target.value;
        const items = receipt.items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        setReceipt(prev => ({ ...prev, items }));
    };

    const addItem = () => {
        setReceipt(prev => ({ ...prev, items: [...prev.items, { name: '', price: '', quantity: '', broken: '' }] }));
    };

    const removeItem = (index) => {
        const items = receipt.items.filter((_, i) => i !== index);
        setReceipt(prev => ({ ...prev, items }));
    };

    const onSubmit = () => {
        handleSubmit(receipt);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? 'Edit Receipt' : 'Add Receipt'}</DialogTitle>
            <DialogContent>
                {receipt.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Item Name"
                            fullWidth
                            value={item.name}
                            onChange={(e) => handleChange(e, index, 'name')}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            label="Price"
                            fullWidth
                            value={item.price}
                            onChange={(e) => handleChange(e, index, 'price')}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            margin="dense"
                            name="quantity"
                            label="Quantity"
                            fullWidth
                            value={item.quantity}
                            onChange={(e) => handleChange(e, index, 'quantity')}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            margin="dense"
                            name="broken"
                            label="Broken"
                            fullWidth
                            value={item.broken}
                            onChange={(e) => handleChange(e, index, 'broken')}
                            style={{ marginRight: '10px' }}
                        />
                        <IconButton onClick={() => removeItem(index)}>
                            <RemoveCircleOutline color="secondary" />
                        </IconButton>
                    </div>
                ))}
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addItem}
                    startIcon={<AddCircleOutline />}
                >
                    Add Item
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
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