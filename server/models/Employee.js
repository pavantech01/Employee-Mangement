const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    course: {
        type: [String],
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    },
    image: {
        type: String,
        // required: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);