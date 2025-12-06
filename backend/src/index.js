import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import database from './utils/db.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connecting to database
database();

const PORT = process.env.PORT || 3000;


// Basic route to check server status
app.get('/', (req, res) => {
  res.status(200).send('Retail Sales Management System Backend is running');
});


// routing
app.use('/api/v1', routes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});