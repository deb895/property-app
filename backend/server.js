require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const propertyRoutes = require('./routes/properties');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() =>console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/properties',propertyRoutes);
app.use('/api',authRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));