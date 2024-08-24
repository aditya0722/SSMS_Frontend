import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Dashboard, Description, ExitToApp, Poll, SupervisedUserCircle,BookOnline, Web,AccountBoxSharp,Receipt } from '@mui/icons-material';
import 'react-pro-sidebar';
import 'tailwindcss/tailwind.css';
import {Link,useNavigate} from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
const SidebarMenu = ({ collapsed }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const openConfirm=()=>{
    setIsConfirmOpen(true)
  }
  const handleDLogout=()=>{
    localStorage.removeItem('user');
    navigate('/');
  }
  const closeConfirm=()=>{
    setIsConfirmOpen(false)
  }
  return (
    <>
    <Sidebar collapsed={collapsed} className="h-full bg-white shadow-md ">
    <Menu iconShape="circle">
        <Link to="/UserDashboard"><MenuItem icon={<Dashboard className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Dashboard</MenuItem></Link>
        <Link to="/UserStoreManagenemt"><MenuItem icon={<Web className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Store</MenuItem></Link>
        <Link to="/UserReceiptManagement"><MenuItem icon={<Receipt className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Receipt</MenuItem></Link>
        <Link to="/Users"><MenuItem icon={<SupervisedUserCircle className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">User</MenuItem></Link>
        <Link to="/UserAccountManagement"><MenuItem icon={<AccountBoxSharp className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Accounts</MenuItem></Link>
        <Link to="/UserBlogManagement"><MenuItem icon={<Description className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Blog</MenuItem></Link>
        <Link to="/UserAttandance"><MenuItem icon={<BookOnline className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Attandance</MenuItem></Link>
      </Menu>
      <div className="mt-auto">
        <Menu iconShape="circle">
          <MenuItem icon={<ExitToApp className="w-6 h-6 mr-2" />} className="hover:bg-gray-200" onClick ={openConfirm}>Logout</MenuItem>
        </Menu>
      </div>
    </Sidebar>
    <ConfirmDialog open={isConfirmOpen} handleClose={closeConfirm} handleConfirm={() => handleDLogout()} title="Logout" description="Are you sure you want to Logout?" />
    </>
  );
};

export default SidebarMenu;
