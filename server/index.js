require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const bodyParser = require('body-parser');
const app = express();

// Connect Database
connectDB();


// Init Middleware
app.use(cors());
app.use(express.json());
app.use('/', authRoutes);
app.use('/', employeeRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));

// Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'utils/uploads')));


// app.use('/uploads', express.static(path.join(__dirname, '../assets')));
// app.use('/assets', express.static(path.join(__dirname, '../assets')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));