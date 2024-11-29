import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    // const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className='min-h-screen'>
            <div className='text-center h-full'>
                <h1>Welcome to Admin Panel</h1>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;