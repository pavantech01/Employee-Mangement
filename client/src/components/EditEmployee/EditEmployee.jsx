import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditEmployee() {

    const navigate = useNavigate();
    const { id } = useParams(); // Use useParams to get the employee ID from the URL
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchEmployee();
            console.log('im printing employees')
        }
    },
    // eslint-disable-next-line
     [id]);

    // useEffect(() => {
    //     fetchEmployee();
    // }, []);


    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employees/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

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

    const handleImageChange = (e) => {
        setEmployee(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in employee) {
            if (key === 'course') {
                employee[key].forEach(course => formData.append('course[]', course));
            } else if (key === 'image' && employee[key] instanceof File) {
                formData.append(key, employee[key]);
            } else if (key !== 'image') {
                formData.append(key, employee[key]);
            }
        }

        try {
            await axios.patch(`http://localhost:5000/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/employees'); // Use navigate to redirect
        } catch (error) {
            alert('Error updating employee');
            console.error('Error updating employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name="mobile" value={employee.mobile} onChange={handleChange} placeholder="Mobile" required />
            <select name="designation" value={employee.designation} onChange={handleChange} required>
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            <div>
                <label>
                    <input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleChange} />
                    Male
                </label>
                <label>
                    <input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleChange} />
                    Female
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" name="course" value="MCA" checked={employee.course.includes('MCA')} onChange={handleCourseChange} />
                    MCA
                </label>
                <label>
                    <input type="checkbox" name="course" value="BCA" checked={employee.course.includes('BCA')} onChange={handleCourseChange} />
                    BCA
                </label>
                <label>
                    <input type="checkbox" name="course" value="BSC" checked={employee.course.includes('BSC')} onChange={handleCourseChange} />
                    BSC
                </label>
            </div>
            <input type="file" name="image" onChange={handleImageChange} accept="image/jpeg, image/png" />
            {employee.image && typeof employee.image === 'string' && (

                <img src={employee.image} alt="Current employee" width="100" />
            )}
            <button type="submit">Update Employee</button>
        </form>
    );
}

export default EditEmployee;
