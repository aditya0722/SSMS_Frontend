import React, { useEffect, useState } from 'react';
import { Container, Typography, Snackbar, Alert, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
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
                const response = await axios.get("https://ssmss-backend.onrender.com/api/blogs");
                setBlogs(response.data);
                if (response.data.length > 0) {
                    setSelectedBlog(response.data[0]); // Set the first blog as the selected blog by default
                }
            } catch (e) {
                console.log(e);
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

    const handleSave = async () => {
        console.log(formData);
        if (formData._id) {
            console.log("update");
            try {
                setLoading(true);
                await axios.put(`https://ssmss-backend.onrender.com/api/updateBlog/${formData._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                handleCloseDialog();
                const response = await axios.get("https://ssmss-backend.onrender.com/api/blogs");
                setBlogs(response.data);
                setSnackbar({ open: true, message: 'Blog updated successfully', severity: 'success' });
            } catch (error) {
                console.log(error);
                setSnackbar({ open: true, message: error.response.data.data, severity: 'error' });
            } finally {
                setLoading(false);
                closeForm();
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
            await axios.post('https://ssmss-backend.onrender.com/api/postblog', blogData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setLoading(false);
            setSnackbar({ open: true, message: 'Blog added successfully', severity: 'success' });
            const response = await axios.get("https://ssmss-backend.onrender.com/api/blogs");
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
        console.log("to delete id", userToDelete);
        try {
            setLoading(true);
            await axios.delete(`https://ssmss-backend.onrender.com/api/deleteBlog/${id}`);
            setSnackbar({ open: true, message: 'Blog deleted successfully!', severity: 'success' });
            const response = await axios.get("https://ssmss-backend.onrender.com/api/blogs");
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
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
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                    <SidebarMenu collapsed={isSidebarCollapsed} />
                </div>
                <Container>
                    <Typography variant="h4" sx={{ padding: '10px' }}>Blog Management</Typography>
                    <Button variant="contained" color="primary" startIcon={<Add />} sx={{ ml: 2 }} onClick={() => handleOpenDialog()}>
                        Create Blog
                    </Button>
                    <div className="flex mt-4">
                        <Box flex={2} pr={2}>
                            {selectedBlog && (
                                <>
                                    <Container sx={{ height: "60vh" }}>
                                        {selectedBlog.imageUrl && <img src={selectedBlog.imageUrl} alt="Blog" style={{ width: '100%', height: '100%' }} />}
                                    </Container>
                                    <Typography variant="h5">{selectedBlog.title}</Typography>
                                    <Typography variant="body1">{selectedBlog.description}</Typography>
                                    <Typography variant="body2">{new Date(selectedBlog.date).toLocaleDateString()} - {selectedBlog.location}</Typography>
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
                        </Box>
                        <Box flex={1} pl={2} sx={{ overflowY: 'scroll', maxHeight: '60vh' }}>
                            {blogs.map((blog, index) => (
                                <Box key={index} classNmae=" mx" mb={2} onClick={() => setSelectedBlog(blog)} sx={{ cursor: 'pointer' }}>
                                    <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
                                    <Typography variant="body1">{blog.title}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </div>
                    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                    <ConfirmDialog open={isConfirmOpen} handleClose={closeConfirm} handleConfirm={() => handleDelete(userToDelete)} title="Delete Blog" description="Are you sure you want to delete this Blog?" />
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>{formData._id ? 'Edit Blog' : 'Create Blog'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="date"
                                label="Date"
                                type="date"
                                fullWidth
                                value={formData.date}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                margin="dense"
                                name="location"
                                label="Location"
                                type="text"
                                fullWidth
                                value={formData.location}
                                onChange={handleChange}
                            />
                            <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                Upload Image
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                            {formData.imageUrl || file ? (
                                <img src={file ? URL.createObjectURL(file) : formData.imageUrl} alt="Upload Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                            ) : null}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                            <Button onClick={handleSave} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </div>
        </>
    );
};

export default BlogManagement;
