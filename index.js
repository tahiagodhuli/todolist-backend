const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const taskRoutes = require('./routes/tasks'); // Import task routes

const app = express();
const PORT = 4000; // Updated port to avoid conflicts

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
    .connect('mongodb+srv://tahia8010:tahia1226@cluster0.miyok.mongodb.net/tododb?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/tasks', taskRoutes); // Use task routes

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
