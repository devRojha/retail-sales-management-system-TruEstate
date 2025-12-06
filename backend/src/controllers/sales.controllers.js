import * as salesService from "../services/sales.services.js";

export const getSales = async (req, res) => {
    try {
        const data = await salesService.getSales(req.query);
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};
