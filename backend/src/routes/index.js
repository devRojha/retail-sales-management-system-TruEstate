import express from 'express';

import salesRoutes from './sales.routes.js';

const router = express.Router();


// routing lists
router.use('/sales', salesRoutes);




export default router; 
