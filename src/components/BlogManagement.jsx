import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, useMediaQuery } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ProgressBar from './ProgressBar';
const BlogManagement = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', image: '' });
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const [loading, setLoading] = useState(false);
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

    const handleNextBlog = () => {
        if (currentBlogIndex < blogs.length - 1) {
            setCurrentBlogIndex(currentBlogIndex + 1);
        }
    };

    const handlePrevBlog = () => {
        if (currentBlogIndex > 0) {
            setCurrentBlogIndex(currentBlogIndex - 1);
        }
    };

    const handleOpenDialog = (blog) => {
        if (blog) {
            setFormData(blog);
        } else {
            setFormData({ title: '', description: '', date: '', location: '', image: '' });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (formData.id) {
            const updatedBlogs = blogs.map((blog) => (blog.id === formData.id ? formData : blog));
            setBlogs(updatedBlogs);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
            }));
            setBlogs([...blogs, formData]);
        }
        handleCloseDialog();
    };

    const handleDelete = (id) => {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
        if (currentBlogIndex >= updatedBlogs.length) {
            setCurrentBlogIndex(updatedBlogs.length - 1);
        }
    };

    return (
        <>
          <ProgressBar loading={loading} />
            <AdminNav toggleSidebar={toggleSidebar} />
            <div className='flex min-h-screen'>
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                    <SidebarMenu collapsed={isSidebarCollapsed} />
                </div>
                <Container>
                    <Typography variant='h4' sx={{ padding: '10px' }}>Blog Management</Typography>
                    <Button variant="contained" color="primary" startIcon={<Add />} sx={{ ml: 2 }} onClick={() => handleOpenDialog()}>
                        Create Blog
                    </Button>
                    {blogs.length > 0 && (
                        <>
                            <Box display="flex" mt={4}>
                                <Box flex={1} pr={2}>
                                    <Typography variant='h5'>{blogs[currentBlogIndex].title}</Typography>
                                    <Typography variant='body1'>{blogs[currentBlogIndex].description}</Typography>
                                    <Typography variant='body2'>{blogs[currentBlogIndex].date} - {blogs[currentBlogIndex].location}</Typography>
                                    {blogs[currentBlogIndex].image && <img src={blogs[currentBlogIndex].image} alt="Blog" style={{ width: '100%', height: 'auto' }} />}
                                    <Box mt={2}>
                                        <IconButton color="primary" onClick={() => handleOpenDialog(blogs[currentBlogIndex])}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDelete(blogs[currentBlogIndex].id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {!isSmallScreen && (
                                    <Box flex={1} pl={2}>
                                        {blogs.slice(0, currentBlogIndex).map((blog, index) => (
                                            <img key={index} src={blog.image} alt={`Previous Blog ${index}`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                        ))}
                                    </Box>
                                )}
                            </Box>
                            <Box display="flex" justifyContent="center" mt={2} mb={10}>
                                <Button variant="contained" color="primary" onClick={handlePrevBlog} disabled={currentBlogIndex === 0}>
                                    Previous
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNextBlog} disabled={currentBlogIndex === blogs.length - 1} sx={{ ml: 2 }}>
                                    Next
                                </Button>
                            </Box>
                        </>
                    )}
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>{formData.id ? 'Edit Blog' : 'Create Blog'}</DialogTitle>
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
                                <input type="file" hidden onChange={handleImageUpload} />
                            </Button>
                            {formData.image && <img src={formData.image} alt="Upload Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                            <Button onClick={handleSave} color="primary">{formData.id ? 'Update' : 'Create'}</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </div>
        </>
    );
}

export default BlogManagement;
