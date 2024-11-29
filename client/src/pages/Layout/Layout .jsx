import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

// import Navbar from '../../components/Navbar/Navbar';
// import EmployeeList from '../../components/Employee/EmployeeList';


function Layout() {
    // const isAuthenticated = !!localStorage.getItem('token');

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div>
            {/* <Navbar /> */}
            {/* <EmployeeList/> */}
            <Outlet />
        </div>
    );
}

export default Layout;