import express from "express";

import { getSales } from "../controllers/sales.controllers.js";



const router = express.Router();

router.get("/", getSales);

export default router;