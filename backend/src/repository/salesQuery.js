import Sales from "../models/sales.js";


export const getSalesQuery = async (mongoQuery, sort, skip, limit) => {
    const sales = await Sales.find(mongoQuery)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    
    return sales;
}

export const getSalesCount = async (mongoQuery) => {
    const total = await Sales.countDocuments(mongoQuery);
    return total;
}
