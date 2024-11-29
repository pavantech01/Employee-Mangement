import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeList.css';
import dayjs from 'dayjs';


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6); // Limit employees per page
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchEmployees();
    }, []);



    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log(response.data);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                console.log('Employee deleted successfully:', response.data);

                // Remove the deleted employee from the state
                setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));

                alert('Employee deleted successfully');
            } catch (error) {
                console.error('Detailed error information:', error);

                if (error.response) {
                    console.error('Server responded with error:', error.response.status, error.response.data);
                    alert(`Server error: ${error.response.status}. Please check the console for more details.`);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('No response received from server. Please check your network connection.');
                } else {
                    console.error('Error setting up the request:', error.message);
                    alert('An unexpected error occurred. Please try again.');
                }
            }
        }
    };


    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedEmployees = [...employees].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setEmployees(sortedEmployees);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='employee-list-container min-h-screen'>
            <h2>Employee List</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search employees by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <h4 className='px-2'>Total Employees: {employees.length}</h4>

            {/* Employee table */}
            <div className='table-container flex justify-center'>
                <table className='employee-table'>
                    <thead className='table-header'>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th onClick={() => sortData('name')}>Name</th>
                            <th onClick={() => sortData('email')}>Email</th>
                            {/* <th>Name</th>
                            <th>Email</th> */}
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            {/* <th>Create Date</th> */}
                            <th onClick={() => sortData('createDate')}>Create Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map(employee => (

                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                {/* <td><img src={employee.image} alt={employee.name} width="50" /></td> */}
                                <td>
                                    {/* <img
                                        src={employee.image ? `/uploads/${employee.image}` : 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg'}
                                        alt={employee.name}
                                        width="50"
                                        loading="lazy"
                                        onError={(e) => {
                                            // console.log(`Image failed to load for employee: ${employee.image} ${employee.name}. Using default.`);
                                            e.target.src = 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg';
                                        }}
                                    /> */}
                                    {/* <img
                                        src={employee.image ? `/assets/${employee.image}` : 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg'}
                                        alt={employee.name}
                                        width="50"
                                        loading="lazy"
                                        onError={(e) => {
                                            // console.log(`Image failed to load for employee: ${employee.image} ${employee.name}. Using default.`);
                                            e.target.src = 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg';
                                        }}
                                    /> */}

                                    {/* <img
                                        src={`http://localhost:5000/uploads/${employee.image}`}
                                        // src={employee.image}
                                        alt={employee.name}
                                        width="50"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg'; // Default image on error
                                            console.log(`Image URL: http://localhost:5000/uploads/${employee.image}`);
                                        }}
                                    /> */}
                                    <img
                                        src={employee.image
                                            ? `http://localhost:5000/uploads/${employee.image}`
                                            : 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg'}
                                        alt={employee.name}
                                        width="50"
                                        onError={(e) => {
                                            e.target.src = 'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg';

                                            // console.log(`Failed to load image: ${employee.image} & name ${employee.name}`);
                                            console.log(`Image URL: ${employee.image ? `http://localhost:5000/uploads/${employee.image}` : 'No image'}`);
                                        }}
                                    />

                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.course.join(' | ')}</td>
                                {/* <td>{new Date(employee.createDate).toLocaleDateString()}</td> */}
                                {/* <td>{employee.createDate ? new Date(employee.createDate).toLocaleDateString() : 'Invalid date'} </td> */}
                                <td>{employee.createDate ? dayjs(employee.createDate).format('MM/DD/YYYY') : 'Invalid date'} </td>


                                <td>
                                    {/* logic should be changed as of its active default */}
                                    <span className={employee.active ? 'status-active' : 'status-inactive'}>
                                        {employee.active ? 'Inactive' : 'Active'}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/edit-employee/${employee._id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage)).keys()].map(num => (
                    <button key={num + 1} onClick={() => paginate(num + 1)} className={currentPage === num + 1 ? 'active' : ''}>
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EmployeeList;
