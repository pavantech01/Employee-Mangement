import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // const isAuthenticated = !!localStorage.getItem('token');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        } catch (error) {
            alert('Invalid login details');
        }
    };

    return (
            <div className="flex items-center justify-center  bg-gradient-to-b from-teal-500 to-teal-700 ">
            <div className="w-full max-w-sm bg-slate-300 rounded-lg shadow-md overflow-hidden">

                <div>
                    <h3 className='flex justify-center font-mono'>Admin Login</h3>
                </div>

                <div className="bg-gray-200 p-4 flex justify-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>

                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* <div> */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email ID"
                        required
                        className="-min-w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {/* </div> */}
                    {/* <div> */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {/* </div> */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <a href="/login" className="text-purple-600 mb-0">Forgot Password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-navy-blue text-white font-semibold rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default Login;