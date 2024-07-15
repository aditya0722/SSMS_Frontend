import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Dashboard, Description, ExitToApp, Poll, SupervisedUserCircle, Web } from '@mui/icons-material';
import 'react-pro-sidebar';
import 'tailwindcss/tailwind.css';
import {Link} from 'react-router-dom'

const SidebarMenu = ({ collapsed }) => {
  return (
    <Sidebar collapsed={collapsed} className="h-full bg-white shadow-md">
      <Menu iconShape="circle">
        <Link to="/AdminDashboard"><MenuItem icon={<Dashboard className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Dashboard</MenuItem></Link>
        <Link to="/StoreManagenemt"><MenuItem icon={<Web className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Store Management</MenuItem></Link>
        <Link to="/UserManagement"><MenuItem icon={<SupervisedUserCircle className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">User Management</MenuItem></Link>
        <MenuItem icon={<Description className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Blog Management</MenuItem>
        <SubMenu title="Reports" icon={<Poll className="w-6 h-6 mr-2" />}>
          <MenuItem icon={<Poll className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Financial Reports</MenuItem>
          <MenuItem icon={<Poll className="w-6 h-6 mr-2" />} className="hover:bg-gray-200">Utility Reports</MenuItem>
        </SubMenu>
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
