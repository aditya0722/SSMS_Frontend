import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Dashboard, Description, ExitToApp, Poll, SupervisedUserCircle, Web,AccountBoxSharp,Receipt } from '@mui/icons-material';
import 'react-pro-sidebar';
import 'tailwindcss/tailwind.css';
import {Link} from 'react-router-dom'
const SidebarMenu = ({ collapsed }) => {
  return (
    <Sidebar collapsed={collapsed} className="h-full bg-white shadow-md ">
      <Menu iconShape="circle">
        <Link to="/AdminDashboard"><MenuItem icon={<Dashboard className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Dashboard</MenuItem></Link>
        <Link to="/StoreManagenemt"><MenuItem icon={<Web className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Store Management</MenuItem></Link>
        <Link to="/ReceiptManagement"><MenuItem icon={<Receipt className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Receipt Management</MenuItem></Link>
        <Link to="/UserManagement"><MenuItem icon={<SupervisedUserCircle className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">User Management</MenuItem></Link>
        <Link to="/AccountManagement"><MenuItem icon={<AccountBoxSharp className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Accounts Management</MenuItem></Link>
        <Link to="/BlogManagement"><MenuItem icon={<Description className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Blog Management</MenuItem></Link>
        
      </Menu>
      <div className="mt-auto">
        <Menu iconShape="circle">
          <MenuItem icon={<ExitToApp className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Logout</MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default SidebarMenu;
