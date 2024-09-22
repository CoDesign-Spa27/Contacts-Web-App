import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const port = 3000;

app.use('/api/contacts',contactRoutes)
 
app.listen(port, () => {
 
  console.log(`Server is running on http://localhost:${port}`);
});