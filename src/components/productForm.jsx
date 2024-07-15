import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProductForm = ({ open, handleClose, handleSubmit, initialData }) => {
    const [product, setProduct] = useState({ name: '', stock: 0, price: 0.00 });

    useEffect(() => {
        if (initialData) {
            setProduct(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFormSubmit = () => {
        handleSubmit(product);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="Product Name"
                    type="text"
                    fullWidth
                    value={product.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="stock"
                    label="Stock"
                    type="number"
                    fullWidth
                    value={product.stock}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={product.price}
                    onChange={handleChange}
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
