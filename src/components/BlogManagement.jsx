import React, { useState,useEffect } from 'react'
import {Container,Typography,Button,Box} from "@mui/material"
import {Add} from '@mui/icons-material'
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
const BlogManagement = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
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
    
  return (
    <>
    <AdminNav toggleSidebar={toggleSidebar} />
      <div className='flex h-screen'>
        <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0 -mx-10' : 'translate-x-0'}`}>
          <SidebarMenu collapsed={isSidebarCollapsed} />
        </div>
        <Container>
            <Typography variant={'h4'} sx={{padding:"10px"}}>Blog Managemnet</Typography>
            <Button variant="contained" color="primary" startIcon={<Add />} sx={{ ml: 2 }}>
                Create Blog
            </Button>
            <Box mb={10} height={500}>
              
            </Box>
        </Container>
      </div>
       
    </>
  )
}

export default BlogManagement