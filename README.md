# Retail Sales Management System

### 1. Overview

This project is a Retail Sales Management System built to support advanced search, filtering, sorting, and pagination on sales data. It includes a clean separation between frontend and backend, ensuring scalable performance and maintainable architecture. The application provides a seamless UI for exploring customer, product, and sales data with real-time query capabilities.

##

### 2. Tech Stack

Frontend : React + Vite, Javascript, CSS.

Backend : Node.js, Express.js, Javascript, Redis

Database : MongoDB

Deployment : Azure Virtual Machine

Other : Axios, dotenv, Recoil (State Management)

##

## Query Handling Approach

My approach is to dynamically pass query parameters to the backend by initializing a mongoQuery object and adding search, filter based on user input. Each field is independently optional, and only the provided fields are added to the query. A dynamic sort object is also constructed for sorting, and pagination is applied using skip and limit. The final combined query is executed using the MongoDB find method.
```
// Example
let mongoQuery = {};
let sort = {};
let skip = 10;
let limit = 10;

// Search, filter, and sort parameters are added dynamically
// Pagination values (skip, limit) are computed based on page number

const data = await Sales.find(mongoQuery)
                       .sort(sort)
                       .skip(skip)
                       .limit(limit);
```
This ensures flexible and efficient searching, filtering, sorting and pagination in the database.

Used **Redis to reduce latency** by caching queries based on query params 

##

### 3. Search Implementation

Full-text search is supported on the **Customer Name** and **Phone Number** fields.

The search implements a **case-insensitive, multi-field search** using MongoDB's **`$or`** operator. It allows users to match a partial string (`query.search`) against either the **"Customer Name"** field directly (using **`$regex`**), or against the **"Phone Number"** field after converting the number to a string (using **`$expr`** and **`$toString`**). This enables flexible searching by name or phone fragment through a single input.

```javascript
// Search logic uses $or to match EITHER the customer name OR the phone number.
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
```
##

### 4. Filter Implementation
Filters are applied by dynamically adding conditions to the mongoQuery object based on user input. Each filter field is optional, and only provided filters are included in the query. Multiple filters can be combined to refine the results.

Supported Filters:

-> Region: Matches any of the selected regions.

-> Gender: Matches any of the selected genders.

-> Product Category: Matches any of the selected categories.

-> Tags: Matches records containing all specified tags using a case-insensitive regex.

-> Payment Method: Matches any of the selected payment methods.

-> Age: Filters records within a specified minimum and maximum age range.

-> Date: Filters records within a specified start and end date range.

##

### 5. Sorting Implementation

Sorting is implemented by constructing a dynamic sort object, which is passed to Mongoose’s .sort() method. The sort key and order are determined based on user input, enabling flexible ordering of query results. Only one sort field is applied at a time, and the sort order can be ascending (1) or descending (-1) depending on the field type.

Supported Sorting Fields:

-> Date: { Date: -1 } — sorts documents by the Date field in descending order (most recent first).

-> Quantity: { Quantity: -1 } — sorts documents by the Quantity field in descending order (highest value first).

-> Customer Name: { "Customer Name": 1 } — sorts documents alphabetically by Customer Name in ascending order.

##

### 6. Paging Implementation
Pagination is implemented using Mongoose’s .skip() and .limit() methods to efficiently retrieve a subset of documents. The page number and limit (number of documents per page) are used to calculate the skip value, which determines the starting index of the results for the current page.
```
limit = 10
let page = 1

skip = (page - 1) * limit

Ex1 : page = 1 => skip = 0
Ex2 : page = 2 => skip = 10
Ex3 : page = 3 => skip = 20
```

##

### 7. Setup Instructions (Locally)

#### 7.1. Frontend : 
```
cd frontend

# Install dependencies
npm i

# Run the application (default: port 5173)
npm run dev

```

#### 7.2. Backend : 

```
cd backend

# Install dependencies
npm i

# Start the application

# With nodemon (recommended for development)
npm run dev

######### OR ###############

# Without nodemon
node src/index.js

```

#### 7.3. Redis Setup locally for caching (Optional) :

First need to uncomment some code (May very):
```javascript
Directory => backend/src/services/sales.services.js

///////////// Line no. from 8 to 14 /////////////////

const cacheKey = `sales:${JSON.stringify(query)}`;
const cachedData = await redis.get(cacheKey);
if (cachedData) {
   // Cache Hit 
   return JSON.parse(cachedData);
}

///////////// Line no. from 108 to 110 /////////////////

await redis.set(cacheKey, JSON.stringify(response), { 
   'EX': 60 * 10
})


Directory => backend/src/utils/redis.utils.js
///////////// Line no. 7 /////////////////

await redis.connect();

```

Now run the following command to run redis locally

```
# for docker user
docker run -p 6379:6379 --name redis-local redis

######### OR ###############

# Running Redis locally (without Docker)

# macOS (Homebrew)
brew install redis
redis-server

# Ubuntu / Linux
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

