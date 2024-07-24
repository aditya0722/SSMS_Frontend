import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProductForm = ({ open, handleClose, handleSubmit, initialData }) => {
    const [product, setProduct] = useState({ itemName: '', stock: 0, price: 0.00 });
    const [errors, setErrors] = useState({ itemName: '', stock: '', price: '' });

    useEffect(() => {
        if (initialData) {
            setProduct(initialData);
        } else {
            setProduct({ itemName: '', stock: 0, price: 0.00 });
        }
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });

        // Resetting the error message for the field being edited
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let valid = true;
        let newErrors = { itemName: '', stock: '', price: '' };

        if (!product.itemName) {
            newErrors.itemName = 'Product name is required';
            valid = false;
        }
        if (product.stock < 0) {
            newErrors.stock = 'Stock cannot be negative';
            valid = false;
        }
        if (product.price < 0) {
            newErrors.price = 'Price cannot be negative';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleFormSubmit = () => {
        if (validate()) {
            handleSubmit(product);
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="itemName"
                    label="Product Name"
                    type="text"
                    fullWidth
                    value={product.itemName}
                    onChange={handleChange}
                    error={!!errors.itemName}
                    helperText={errors.itemName}
                />
                <TextField
                    margin="dense"
                    name="stock"
                    label="Stock"
                    type="number"
                    fullWidth
                    value={product.stock}
                    onChange={handleChange}
                    error={!!errors.stock}
                    helperText={errors.stock}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Price per item"
                    type="number"
                    fullWidth
                    value={product.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">{initialData ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
