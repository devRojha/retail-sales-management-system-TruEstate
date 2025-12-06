import buildQuery from "../utils/buildQuery";



const BASE_URL = 'http://localhost:3000/api/v1'; 

export async function fetchSalesData(filters) {

        
    const queryParams = buildQuery(filters);

    const response = await fetch(`${BASE_URL}/sales?${queryParams}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch sales data');
    }

    return response.json();
}