import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import NavBar from './NavBar';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
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
                setLoading(true);
                const response = await axios.get("https://ssmss-backend.onrender.com/api/blogs");
                setBlogs(response.data);
                if (response.data.length > 0) {
                    setSelectedBlog(response.data[0]); // Set the first blog as the selected blog by default
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        getBlogs();
    }, []);

    return (
        <>
            <ProgressBar loading={loading} />
            <Spinner loading={loading} />
            <NavBar />
            <div className="flex min-h-screen">
                <Container>
                    <Typography variant="h4" sx={{ padding: '20px', color: '#1976d2' }}>
                        Blogs
                    </Typography>

                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={8}>
                            {selectedBlog && (
                                <>
                                    <Box
                                        sx={{
                                            height: '70vh',
                                            border: '2px solid #1976d2',
                                            borderRadius: '8px',
                                            padding: '10px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={selectedBlog.imageUrl || 'https://fakeimg.pl/600x400'}
                                            alt={selectedBlog.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="h5" mt={2} sx={{ color: '#1976d2' }}>
                                        {selectedBlog.title}
                                    </Typography>
                                    <Typography variant="body1" mt={1} sx={{ color: '#455a64' }}>
                                        {selectedBlog.description}
                                    </Typography>
                                    <Typography variant="body2" mt={1} sx={{ color: '#455a64' }}>
                                        {new Date(selectedBlog.date).toLocaleDateString()} - {selectedBlog.location}
                                    </Typography>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    overflowY: 'auto',
                                    maxHeight: '100vh',
                                    border: '2px solid #1976d2',
                                    borderRadius: '8px',
                                    padding: '10px',
                                }}
                            >
                                {blogs.map((blog, index) => (
                                    <Box
                                        key={index}
                                        mb={2}
                                        onClick={() => setSelectedBlog(blog)}
                                        sx={{
                                            cursor: 'pointer',
                                            padding: '10px',
                                            border: '1px solid #90caf9',
                                            borderRadius: '8px',
                                            '&:hover': { backgroundColor: '#e3f2fd' },
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={blog.imageUrl || 'https://fakeimg.pl/600x400'}
                                            alt={blog.title}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Typography variant="body1" sx={{ color: '#1976d2', mt: 1 }}>
                                            {blog.title}
                                        </Typography>
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

export default Blogs;
