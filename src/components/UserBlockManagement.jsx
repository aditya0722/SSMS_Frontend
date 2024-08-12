import React, { useEffect, useState } from 'react';
import { Container, Typography, Snackbar, Alert, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import UserSideBar from './UserSideBar';
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
                const response = await axios.get("https://ssmss-backend.onrender.com/api/blogs");
                setBlogs(response.data);
                if (response.data.length > 0) {
                    setSelectedBlog(response.data[0]); // Set the first blog as the selected blog by default
                }
            } catch (e) {
                console.log(e);
            }
            finally {
                setLoading(false)
            }
        }

        getBlogs();
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    

  
    

    

    
   
   

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

   
    return (
        <>
            <ProgressBar loading={loading} />
            <Spinner loading={loading} />
            <AdminNav toggleSidebar={toggleSidebar} />
            <div className="flex min-h-screen">
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
                    <UserSideBar collapsed={isSidebarCollapsed} />
                </div>
                <Container >
                    <Typography variant="h4" sx={{ padding: '20px', marginLeft: -5 }}>Blog Management</Typography>

                    <Grid container spacing={2} mt={2} >
                        <Grid item xs={12} md={8}>
                            {selectedBlog && (
                                <>
                                    <Container sx={{ height: "60vh", marginLeft: -4 }} >
                                        {selectedBlog.imageUrl ? (
                                            <img src={selectedBlog.imageUrl} alt={selectedBlog.title} style={{
                                                width: '100%',
                                                height: '450px', // You can set a fixed height
                                                objectFit: 'cover',
                                            }} />
                                        ) : (
                                            <img src="https://fakeimg.pl/600x400" style={{ width: '100%', height: '100%' }} alt="Placeholder" />
                                        )}
                                    </Container>
                                    <Typography variant="h5" mt={2}>{selectedBlog.title}</Typography>
                                    <Typography variant="body1" mt={1}>{selectedBlog.description}</Typography>
                                    <Typography variant="body2" mt={1}>{new Date(selectedBlog.date).toLocaleDateString()} - {selectedBlog.location}</Typography>

                                </>
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} ml={-5}>
                            <Box sx={{ overflowY: 'auto' }}>
                                {blogs.map((blog, index) => (
                                    <Box
                                        key={index}
                                        mb={2}
                                        onClick={() => setSelectedBlog(blog)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {blog.imageUrl ? (
                                            <img
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto', // You can set a fixed height
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src="https://fakeimg.pl/600x400"
                                                alt="Placeholder"
                                                style={{
                                                    width: '100%',
                                                    height: '200px', // You can set a fixed height
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        )}
                                        <Typography variant="body1">{blog.title}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>




                </Container>
            </div>
        </>
    );
};

export default BlogManagement;
