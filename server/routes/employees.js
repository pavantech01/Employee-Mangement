const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const path = require('path');
const fs = require('fs');


const multer = require('multer');

// Get all employees
router.get('/employees', auth, async (req, res) => {
    // console.log("employees query startes")
    try {
        const { sortField = 'name', sortDirection = 'asc', filterField, filterValue } = req.query;
        let query = {};

        if (filterField && filterValue) {
            query[filterField] = new RegExp(filterValue, 'i');
        }
        // console.log("employees query in try block")

        const employees = await Employee.find(query).sort({ [sortField]: sortDirection });
        res.json(employees);
        // console.log(employees)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a new employee
// router.post('/employee', [auth, upload.single('image')], async (req, res) => {
//     try {
//         const { name, email, mobile, designation, gender, course } = req.body;

//         // Basic validation
//         if (!name || !email || !mobile || !designation || !gender) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const newEmployee = new Employee({
//             name,
//             email,
//             mobile,
//             designation,
//             gender,
//             course: Array.isArray(course) ? course : [course],
//             image: req.file ? req.file.filename : null
//         });

//         const employee = await newEmployee.save();
//         res.json(employee);
//     } catch (err) {
//         console.error(err.message);
//         if (err.code === 11000) { // Duplicate key error
//             return res.status(400).json({ message: 'Email already exists' });
//         }
//         res.status(500).send('Server Error');
//     }
// });

router.post('/employee', [auth, upload.single('image')], async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        // const imagePath = req.file ? req.file.path : '';  //image path added
        const imagePath = req.file ? req.file.filename : ''; // Only save the filename


        // Basic validation
        if (!name || !email || !mobile || !designation || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course: Array.isArray(course) ? course : [course],
            image: imagePath
        });

        console.log(req.body)

        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'User already exists' });
        }
        res.status(500).send('Server Error');
    }
});

// Get employee by ID
router.get('/employees/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
});


// Update employee
router.patch('/employees/:id', [auth, upload.single('image')], async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const employeeFields = {};
        if (name) employeeFields.name = name;
        if (email) employeeFields.email = email;
        if (mobile) employeeFields.mobile = mobile;
        if (designation) employeeFields.designation = designation;
        if (gender) employeeFields.gender = gender;
        if (course) employeeFields.course = Array.isArray(course) ? course : [course];

        let employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (req.file) {
            // Delete old image if exists
            if (employee.image) {
                // const imagePath = path.join(__dirname, '..', 'uploads', employee.image);//old
                // const imagePath = path.join(__dirname, '..', '/assets', employee.image);
                // fs.unlink(imagePath, err => {
                //     if (err) console.error('Error deleting old image:', err);
                // });
                const imagePath = path.join(__dirname, 'assets', employee.image);
                fs.unlink(imagePath, err => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }
            employeeFields.image = req.file.filename;
        }

        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: employeeFields },
            { new: true }
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// router.patch('/employees/:id', auth, async (req, res) => {
//     const { name, email, mobile, designation, gender, course } = req.body;
//     const employeeFields = { name, email, mobile, designation, gender, course: Array.isArray(course) ? course : [course] };

//     if (req.file) {
//         employeeFields.image = req.file.filename;
//     }

//     try {
//         let employee = await Employee.findById(req.params.id);
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         // Update image only if a new file is provided
//         if (req.file && employee.image) {
//             const imagePath = path.join(__dirname, '..', 'uploads', employee.image);
//             fs.unlink(imagePath, (err) => {
//                 if (err) console.error('Error deleting old image:', err);
//             });
//         }

//         employee = await Employee.findByIdAndUpdate(
//             req.params.id,
//             { $set: employeeFields },
//             { new: true }
//         );

//         res.json(employee);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });



// Delete employee


router.delete('/employees/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Delete associated image file if it exists
        if (employee.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', employee.image);
            try {
                await fs.promises.unlink(imagePath);
            } catch (unlinkError) {
                console.error('Error deleting image file:', unlinkError);
                // Continue with employee deletion even if image deletion fails
            }
        }

        // employee.deleteOne;
        await Employee.deleteOne({ _id: req.params.id });


        res.json({ message: 'Employee removed successfully' });
    } catch (err) {
        console.error('Error in delete employee route:', err);

        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }

        if (err.name === 'MongoError') {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        res.status(500).json({
            message: 'Server Error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
        });
    }
});

module.exports = router;