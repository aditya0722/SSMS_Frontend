import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import axios from 'axios';

const AccountForm = ({ open, handleClose, handleSubmit, initialData, type }) => {
    const [transaction, setTransaction] = useState({ description: '', ammount: 0.00, category: '', date: '', memberId: '' });
    const [members, setMembers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setTransaction({
                ...initialData,
                date: initialData.date ? new Date(initialData.date).toISOString().substr(0, 10) : ''
            });
        } else {
            setTransaction({ description: '', ammount: 0.00, category: '', date: '', memberId: '' });
        }
    }, [initialData]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('https://ssmss-backend.onrender.com/api/login/members');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({ ...transaction, [name]: value });
    };

    const handleMemberChange = (event, newValue) => {
        setTransaction({ ...transaction, memberId: newValue?._id || '' });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.description = transaction.description ? "" : "Description is required.";
        if(type === "Income"){
            tempErrors.ammount = transaction.ammount > 0 ? "" : "Ammount must be greater than 0.";
        } else {
            tempErrors.ammount = transaction.ammount < 0 ? "" : "Ammount must be less than 0.";
        }
        tempErrors.category = transaction.category ? "" : "Category is required.";
        tempErrors.date = transaction.date ? "" : "Date is required.";
        if(transaction.category === 'Donations'){
            tempErrors.memberId = transaction.memberId ? "" : "Member is required for Donations.";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleFormSubmit = () => {
        if (validate()) {
            handleSubmit(transaction);
            handleClose();
        }
    };

    const incomeCategories = [
        { value: 'Monthly', label: 'Monthly Income' },
        { value: 'Donations', label: 'Donations' },
        { value: 'joiningFee', label: 'Joining Fee' },
        { value: 'other', label: 'Others' }
    ];

    const expenditureCategories = [
        { value: 'utilities', label: 'Utilities' },
        { value: 'Donations', label: 'Donations' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'other', label: 'Others' }
    ];

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? `Edit Transaction` : `Add Transaction`}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={transaction.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    margin="dense"
                    name="ammount"
                    label="Ammount"
                    type="number"
                    fullWidth
                    value={transaction.ammount}
                    onChange={handleChange}
                    error={!!errors.ammount}
                    helperText={errors.ammount}
                />
                
                <TextField
                    margin="dense"
                    name="category"
                    label="Category"
                    select
                    fullWidth
                    value={transaction.category}
                    onChange={handleChange}
                    error={!!errors.category}
                    helperText={errors.category}
                >
                    {type === 'Income' ? (
                        incomeCategories.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    ) : (
                        expenditureCategories.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    )}
                </TextField>
                {transaction.category === 'Donations' && (
                    <Autocomplete
                        options={members}
                        getOptionLabel={(option) => option.name}
                        onChange={handleMemberChange}
                        value={members.find(member => member._id === transaction.memberId) || null}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Member"
                                margin="dense"
                                fullWidth
                                error={!!errors.memberId}
                                helperText={errors.memberId}
                            />
                        )}
                    />
                )}
                <TextField
                    margin="dense"
                    name="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={transaction.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date}
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
