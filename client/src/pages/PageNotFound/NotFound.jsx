import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Page Not Found</h1>
            {!isAuthenticated ? (
                <p>Please <Link to="/login">login</Link> to continue.</p>
            ) : (
                <p>The page you're looking for doesn't exist.</p>
            )}
        </div> 
        
    )
}

export default NotFound