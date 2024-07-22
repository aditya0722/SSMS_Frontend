import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, useMediaQuery } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AdminNav from './AdminNav';
import UserSideBar from './UserSideBar';

const BlogManagement = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', image: '' });
    const isSmallScreen = useMediaQuery('(max-width: 768px)');

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

 




    return (
        <>
            <AdminNav toggleSidebar={toggleSidebar} />
            <div className='flex min-h-screen'>
                <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
                    <UserSideBar collapsed={isSidebarCollapsed} />
                </div>
                <Container>
                    <Typography variant='h4' sx={{ padding: '10px' }}>Blog Management</Typography>
                    {blogs.length > 0 && (
                        <>
                            <Box display="flex" mt={4}>
                                <Box flex={1} pr={2}>
                                    <Typography variant='h5'>{blogs[currentBlogIndex].title}</Typography>
                                    <Typography variant='body1'>{blogs[currentBlogIndex].description}</Typography>
                                    <Typography variant='body2'>{blogs[currentBlogIndex].date} - {blogs[currentBlogIndex].location}</Typography>
                                    {blogs[currentBlogIndex].image && <img src={blogs[currentBlogIndex].image} alt="Blog" style={{ width: '100%', height: 'auto' }} />}
                                    
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
                    
                </Container>
            </div>
        </>
    );
}

export default BlogManagement;
