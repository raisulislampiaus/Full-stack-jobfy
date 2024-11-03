const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors())
connectDB();

app.use(errorHandler);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admins', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
