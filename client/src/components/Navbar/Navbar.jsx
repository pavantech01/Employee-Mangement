// import React from 'react';
// import { Link, useNavigate} from 'react-router-dom';

// function NavBar() {
//     const history = useNavigate();
//     const isLoggedIn = !!localStorage.getItem('token');
//     const username = localStorage.getItem('username');

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');
//         history.push('/login');
//     };

//     return (
//         <nav className="min-w-full bg-gray-200 text-black sticky top-0">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div className="flex space-x-4">
//                 <Link to="/" className="hover:underline hover:text-gray-700">Home</Link>
//                 {isLoggedIn && (
//                     <>
//                         <Link to="/dashboard" className="hover:underline hover:text-gray-700">Dashboard</Link>
//                         <Link to="/employees" className="hover:underline hover:text-gray-700">Employee List</Link>
//                         <Link to="/create-employee" className="hover:underline hover:text-gray-700">Create Employee</Link>
//                     </>
//                 )}
//             </div>
//             <div className="flex space-x-4 items-center">
//                 {isLoggedIn ? (
//                     <>
//                         <span className="text-gray-800">{username}</span>
//                         <button
//                             onClick={handleLogout}
//                             className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded transition duration-300"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 ) : 
//                 (
//                     <>
//                         <Link to="/login" className="hover:underline hover:text-gray-700">Login</Link>
//                             <Link to="/dashboard" className="hover:underline hover:text-gray-700">Dashboard</Link>
//                             <Link to="/employees" className="hover:underline hover:text-gray-700">Employees</Link>
//                             <Link to="/create-employee" className="hover:underline hover:text-gray-700">Create Employee</Link>
//                     </>
//                 )}
//             </div>
//         </div>
//     </nav>
//     );
// }

// export default NavBar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="w-full bg-gray-200 shadow-md sticky top-0">
            {/* <div className="container mx-auto px-4"> */}
            
                <div className="flex justify-end items-center py-2">
                <img src="/Emp-Management.png" alt="Logo EMP" className="w-20" />
                    <div className="flex items-center space-x-4">
                        
                        {isLoggedIn && (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 hover:underline-offset-2">Home</Link>
                                <Link to="/employees" className="text-gray-700 hover:text-gray-900 hover:underline-offset-2">Employee List</Link>
                                <Link to="/create-employee" className="text-gray-700 hover:text-gray-900 hover:underline-offset-2">Create Employee</Link>
                            </>
                        )}
                    </div>
                    <div> &nbsp; </div>
                    <div>&nbsp;</div>
                    <div> &nbsp; </div>
                    <div>&nbsp;</div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                
                                <span className="text-gray-800 font-semibold capitalize">{username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"> <button>Login</button></Link>
                        )}
                    </div>
                </div>
            {/* </div> */}
        </nav>
    );
}

export default NavBar;