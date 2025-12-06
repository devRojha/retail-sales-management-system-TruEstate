import express from "express";

import { getSales } from "../controllers/sales.controllers.js";



const router = express.Router();

// get sales data based on query params
router.get("/", getSales);

export default router;