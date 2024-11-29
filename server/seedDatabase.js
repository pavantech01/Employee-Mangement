// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// const Employee = require('./models/Employee');
// const connectDB = require('./config/db');

// // Sample data
// const users = [
//     { username: 'admin', password: 'admin123' },
//     { username: 'user', password: 'user123' }
// ];

// const employees = [
//     { name: 'John Doe', email: 'john@example.com', mobile: '1234567890', designation: 'HR', gender: 'Male', course: ['MCA'] },
//     { name: 'Jane Smith', email: 'jane@example.com', mobile: '2345678901', designation: 'Manager', gender: 'Female', course: ['BCA', 'MCA'] },
//     { name: 'Mike Johnson', email: 'mike@example.com', mobile: '3456789012', designation: 'Sales', gender: 'Male', course: ['BSC'] },
//     { name: 'Emily Brown', email: 'emily@example.com', mobile: '4567890123', designation: 'HR', gender: 'Female', course: ['MCA', 'BSC'] },
//     { name: 'David Lee', email: 'david@example.com', mobile: '5678901234', designation: 'Manager', gender: 'Male', course: ['BCA'] },
//     { name: 'Sarah Wilson', email: 'sarah@example.com', mobile: '6789012345', designation: 'Sales', gender: 'Female', course: ['MCA', 'BCA'] },
//     { name: 'Chris Taylor', email: 'chris@example.com', mobile: '7890123456', designation: 'HR', gender: 'Male', course: ['BSC', 'MCA'] },
//     { name: 'Alex Johnson', email: 'alex@example.com', mobile: '8901234567', designation: 'Manager', gender: 'Female', course: ['BCA', 'BSC'] }
// ];

// const seedDatabase = async () => {
//     try {
//         // Connect to the database
//         await connectDB();

//         // Clear existing data
//         await User.deleteMany();
//         await Employee.deleteMany();

//         console.log('Existing data cleared');

//         // Create users
//         const createdUsers = await Promise.all(users.map(async (user) => {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(user.password, salt);
//             return User.create({ ...user, password: hashedPassword });
//         }));

//         console.log('Users created:', createdUsers.map(user => user.username));

//         // Create employees
//         const createdEmployees = await Employee.create(employees);

//         console.log('Employees created:', createdEmployees.map(emp => emp.name));

//         console.log('Database seeded successfully');
//         process.exit(0);
//     } catch (error) {
//         console.error('Error seeding database:', error);
//         process.exit(1);
//     }
// };

// seedDatabase();

