import { get } from "mongoose";
import { getSalesCount, getSalesQuery } from "../repository/salesQuery.js";
import redis from "../utils/redis.utils.js";
import { getSalesSummary } from "../utils/sales.js";

export const getSales = async (query) => {
    let mongoQuery = {};

    
    // const cacheKey = `sales:${JSON.stringify(query)}`; // create a unique cache key based on query params
    // const cachedData = await redis.get(cacheKey); // check if data exists in cache

    // if (cachedData) {
    //     // Cache Hit 
    //     return JSON.parse(cachedData);
    // }


    // search either on name or phone
    if (query.search) {
        mongoQuery.$or = [
            { "Customer Name": { $regex: query.search, $options: "i" } },
            {
                $expr: {
                    $regexMatch: {
                        input: { $toString: "$Phone Number" },
                        regex: query.search,
                    }
                }
            }
        ];
    }


    // filters
    // based on region
    if (query.region) {
        mongoQuery["Customer Region"] = { $in: query.region.split(",") };
    }

    // based on gender
    if (query.gender) {
        mongoQuery["Gender"] = { $in: query.gender.split(",") };
    }

    // based on category
    if (query.category) {
        mongoQuery["Product Category"] = { $in: query.category.split(",") };
    }

    if (query.tags) {
        // Tags are stored as comma-separated string, so use regex
        const tagsArray = query.tags.split(",");
        mongoQuery["Tags"] = {
            $regex: tagsArray.map(tag => `(?=.*${tag})`).join(""),
            $options: "i",
        };
    }

    // based on payment method
    if (query.payment) {
        mongoQuery["Payment Method"] = { $in: query.payment.split(",") };
    }

    // based on age
    if (query.ageMin && query.ageMax) {
        mongoQuery["Age"] = {
            $gte: Number(query.ageMin),
            $lte: Number(query.ageMax),
        };
    }

    if (query.dateStart && query.dateEnd) {
        mongoQuery["Date"] = {
            $gte: new Date(query.dateStart),
            $lte: new Date(query.dateEnd),
        };
    }

    // sorting
    let sort = {};
    if (query.sort === "date") {
        sort["Date"] = -1;
    }
    else if (query.sort === "quantity") {
        sort["Quantity"] = -1;
    } 
    else if (query.sort === "name") {
        sort["Customer Name"] = 1;
    }

    // pagination
    // default = 1
    const page = Number(query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const sales = await getSalesQuery(mongoQuery, sort, skip, limit);

    const total = await getSalesCount(mongoQuery);

    const summary = getSalesSummary(sales);

    const response = {
        page,
        totalPages: Math.ceil(total / limit),
        total,
        sales,
        summary
    };

    
    // await redis.set(cacheKey, JSON.stringify(response), { 
    //     'EX': 60 * 10 // store the response in cache for future requests (expires in 10 minutes)
    // });
    
    return response;
};
