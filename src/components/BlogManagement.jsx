import React, { useEffect, useState } from 'react';
import { Container, Typography, Snackbar, Alert, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import ConfirmDialog from './ConfirmDialog';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', imageUrl: '' });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [errors, setErrors] = useState({ title: '', description: '', date: '', location: '' });

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

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:3000/api/blogs");
                setBlogs(response.data);
                if (response.data.length > 0) {
                    setSelectedBlog(response.data[0]); // Set the first blog as the selected blog by default
                }
            } catch (e) {
                console.log(e);
            }
            finally{
                setLoading(false)
            }
        }

        getBlogs();
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const openConfirm = (id) => {
        setUserToDelete(id);
        setIsConfirmOpen(true);
    };
    const closeConfirm = () => {
        setIsConfirmOpen(false);
        setUserToDelete(null);
    };

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.title = formData.title ? '' : 'Title is required';
        tempErrors.description = formData.description ? '' : 'Description is required';
        tempErrors.date = formData.date ? '' : 'Date is required';
        tempErrors.location = formData.location ? '' : 'Location is required';

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            handleSave();
        }
    };

    const handleSave = async () => {
        if (formData._id) {
            try {
                setLoading(true);
                await axios.put(`http://localhost:3000/api/updateBlog/${formData._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                handleCloseDialog();
                const response = await axios.get("http://localhost:3000/api/blogs");
                setBlogs(response.data);
                setSnackbar({ open: true, message: 'Blog updated successfully', severity: 'success' });
            } catch (error) {
                console.log(error);
                setSnackbar({ open: true, message: error.response.data.data, severity: 'error' });
            } finally {
                setLoading(false);
                closeConfirm();
            }
            return;
        }
        const blogData = new FormData();
        blogData.append('title', formData.title);
        blogData.append('description', formData.description);
        blogData.append('date', formData.date);
        blogData.append('location', formData.location);
        if (file) {
            blogData.append('image', file);
        }

        try {
            setLoading(true);
            await axios.post('http://localhost:3000/api/postblog', blogData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSnackbar({ open: true, message: 'Blog added successfully', severity: 'success' });
            const response = await axios.get("http://localhost:3000/api/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
            setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
        } finally {
            setLoading(false);
            handleCloseDialog();
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/api/deleteBlog/${id}`);
            setSnackbar({ open: true, message: 'Blog deleted successfully!', severity: 'success' });
            const response = await axios.get("http://localhost:3000/api/blogs");
            setBlogs(response.data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Error occurred', severity: 'error' });
        } finally {
            setLoading(false);
            setIsConfirmOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleOpenDialog = (blog) => {
        if (blog) {
            setFormData(blog);
        } else {
            setFormData({ title: '', description: '', date: '', location: '', imageUrl: '' });
        }
        setOpenDialog(true);
    };

    return (
        <>
            <ProgressBar loading={loading} />
            <Spinner loading={loading} />
            <AdminNav toggleSidebar={toggleSidebar} />
            <div className="flex min-h-screen">
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
                    <SidebarMenu collapsed={isSidebarCollapsed} />
                </div>
                <Container >
                    <Typography variant="h4" sx={{ padding: '20px', marginLeft: -5 }}>Blog Management</Typography>
                    <Button variant="contained" color="primary" startIcon={<Add />} sx={{ ml: -2 }} onClick={() => handleOpenDialog()}>
                        Create Blog
                    </Button>
                    <Grid container spacing={2} mt={2} >
                        <Grid item xs={12} md={8}>
                            {selectedBlog && (
                                <>
                                    <Container sx={{ height: "60vh",marginLeft:-4 }} >
                                        {selectedBlog.imageUrl ? (
                                            <img src={selectedBlog.imageUrl} alt={selectedBlog.title} style={{ width: '100%', height: 'auto' }} />
                                        ) : (
                                            <img src="https://fakeimg.pl/600x400" style={{ width: '100%', height: '100%' }} alt="Placeholder" />
                                        )}
                                    </Container>
                                    <Typography variant="h5" mt={2}>{selectedBlog.title}</Typography>
                                    <Typography variant="body1" mt={1}>{selectedBlog.description}</Typography>
                                    <Typography variant="body2" mt={1}>{new Date(selectedBlog.date).toLocaleDateString()} - {selectedBlog.location}</Typography>
                                    <Box mt={2}>
                                        <IconButton color="primary" onClick={() => handleOpenDialog(selectedBlog)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => openConfirm(selectedBlog._id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} ml={-5}>
                            <Box sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
                                {blogs.map((blog, index) => (
                                    <Box key={index} mb={2} onClick={() => setSelectedBlog(blog)} sx={{ cursor: 'pointer' }} >
                                        {blog.imageUrl ? (
                                            <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
                                        ) : (
                                            <img src="https://fakeimg.pl/600x400" style={{ width: '100%', height: 'auto' }} alt="Placeholder" />
                                        )}
                                        <Typography variant="body1">{blog.title}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                        <DialogTitle>{formData._id ? 'Edit Blog' : 'Create Blog'}</DialogTitle>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    fullWidth
                                />
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    fullWidth
                                />
                                <TextField
                                    name="date"
                                    label="Date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    error={!!errors.date}
                                    helperText={errors.date}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                                <TextField
                                    name="location"
                                    label="Location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    error={!!errors.location}
                                    helperText={errors.location}
                                    fullWidth
                                />
                                   <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                Upload Image
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                            {(formData._id)?<img src={formData.imageUrl} alt="Upload Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />:file && <img src={URL.createObjectURL(file)} alt="Upload Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' } }/>}
                            
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                            <Button onClick={handleSaveClick} color="primary">{formData._id ? 'Update' : 'Create'}</Button>
                        </DialogActions>
                    </Dialog>
                    <ConfirmDialog open={isConfirmOpen} onClose={closeConfirm} onConfirm={() => handleDelete(userToDelete)} />
                </Container>
            </div>
        </>
    );
};

export default BlogManagement;
