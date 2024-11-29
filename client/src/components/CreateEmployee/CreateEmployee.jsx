import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setEmployee(prev => ({
            ...prev,
            course: checked
                ? [...prev.course, value]
                : prev.course.filter(course => course !== value)
        }));
    };

    // const handleImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setEmployee(prev => ({ ...prev, image: e.target.files[0] }));
    //     } else {
    //         setEmployee(prev => ({ ...prev, image: null }));
    //     }
    // };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            console.log(e.target.files[0])
            setEmployee(prev => ({ ...prev, image: e.target.files[0] }));
        } else {
            console.log('employee image is not set '+e.target.files[0])
            setEmployee(prev => ({ ...prev, image: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in employee) {
            if (key === 'course') {
                // Append each course as an array item
                employee[key].forEach(course => formData.append('course[]', course));
            } else if (key ==='image' && employee[key]) {
                // Only append image if it's not null
                formData.append('image', employee[key]);
            } else {
                formData.append(key, employee[key]);
            }
        }

        try {
            await axios.post('http://localhost:5000/employee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/employees');
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-24">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Employee</h2>

            <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="min-w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="min-w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Mobile</label>
                <input
                    type="tel"
                    name="mobile"
                    value={employee.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Designation</label>
                <select
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
            </div>

            <div className="mb-4">
                <span className="block font-semibold mb-1">Gender:</span>
                <label className="block mb-2">
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={employee.gender === 'Male'}
                        onChange={handleChange}
                        className="form-radio text-blue-600 bg-gray-200"
                    />
                    <span className="ml-2">Male</span>
                </label>
                <label className="block mb-2">
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={employee.gender === 'Female'}
                        onChange={handleChange}
                        className="form-radio text-blue-600 bg-gray-200"
                    />
                    <span className="ml-2">Female</span>
                </label>
            </div>

            <div className="mb-4">
                <span className="block font-semibold mb-1">Courses:</span>
                <label className="block mb-2">
                    <input
                        type="checkbox"
                        name="course"
                        value="MCA"
                        onChange={handleCourseChange}
                        className="form-checkbox text-blue-600 bg-gray-200"
                    />
                    <span className="ml-2">MCA</span>
                </label>
                <label className="block mb-2">
                    <input
                        type="checkbox"
                        name="course"
                        value="BCA"
                        onChange={handleCourseChange}
                        className="form-checkbox text-blue-600 bg-gray-200"
                    />
                    <span className="ml-2">BCA</span>
                </label>
                <label className="block mb-2">
                    <input
                        type="checkbox"
                        name="course"
                        value="BSC"
                        onChange={handleCourseChange}
                        className="form-checkbox text-blue-600 bg-gray-200"
                    />
                    <span className="ml-2">BSC</span>
                </label>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Upload Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/jpeg, image/png, image/jpg"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
            >
                Create Employee
            </button>
        </form>
    );
}

export default CreateEmployee;
