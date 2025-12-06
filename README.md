# Retail Sales Management System

### 1. Overview

This project is a Retail Sales Management System built to support advanced search, filtering, sorting, and pagination on structured sales data. It includes a clean separation between frontend and backend, ensuring scalable performance and maintainable architecture. The application provides a seamless UI for exploring customer, product, and sales data with real-time query capabilities.

##

### 2. Tech Stack

Frontend : React + Vite, Javascript, CSS.

Backend : Node.js, Express.js, Javascript, Redis

Database : MongoDB

Deployment : Azure Virtual Machine

Other : Axios, dotenv, Recoil (State Management)

##

## Searching And Filtering

My approach is to create a mongoQuery object and dynamically add search and filter parameters based on user input. Each field is independently optional, and only the provided fields are included in the query, which is then used in the database find method.
```
// for example
let mongoQuery = {}
// add searching and filter parameters dynamically
const data = Sales.find(mongoQuery)
```
This ensures flexible and efficient searching and filtering in the database.



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


### 5. Sorting Implementation

Sorting is implemented by constructing a dynamic sort object, which is passed to Mongoose’s .sort() method. The sort key and order are determined based on user input, enabling flexible ordering of query results. Only one sort field is applied at a time, and the sort order can be ascending (1) or descending (-1) depending on the field type.

Supported Sorting Fields:

-> Date: { Date: -1 } — sorts documents by the Date field in descending order (most recent first).

-> Quantity: { Quantity: -1 } — sorts documents by the Quantity field in descending order (highest value first).

-> Customer Name: { "Customer Name": 1 } — sorts documents alphabetically by Customer Name in ascending order.


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