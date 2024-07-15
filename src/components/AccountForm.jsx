import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';

const AccountForm = ({ open, handleClose, handleSubmit, initialData, type }) => {
    const [transaction, setTransaction] = useState({ description: '', amount: 0.00, category: '', date: '' });

    useEffect(() => {
        if (initialData) {
            setTransaction(initialData);
        } else {
            setTransaction({ description: '', amount: 0.00, category: '', date: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({ ...transaction, [name]: value });
    };

    const handleFormSubmit = () => {
        handleSubmit(transaction);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? `Edit ${type}` : `Add ${type}`}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={transaction.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="amount"
                    label="Amount"
                    type="number"
                    fullWidth
                    value={transaction.amount}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="category"
                    label="Category"
                    type="text"
                    fullWidth
                    value={transaction.category}
                    onChange={handleChange}
                    select
                >
                    <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="bonus">Bonus</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </TextField>
                <TextField
                    margin="dense"
                    name="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={transaction.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">{initialData ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccountForm;
