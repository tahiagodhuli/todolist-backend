const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const taskRoutes = require('./routes/tasks'); // Import task routes

const app = express();
const PORT = process.env.PORT || 4000; // Use Render's PORT variable or fallback to 4000

// Middleware
app.use(cors());  // Enable CORS to allow frontend on port 3000 to communicate with the backend
app.use(bodyParser.json());  // Parse JSON body

// MongoDB Connection
mongoose
    .connect('mongodb+srv://tahia8010:tahia1226@cluster0.miyok.mongodb.net/tododb?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/tasks', taskRoutes); // Use task routes for all "/tasks" requests

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
