import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
        "Transaction ID": { type: Number },
        "Date": { type: Date },

        "Customer ID": { type: String },
        "Customer Name": { type: String },
        "Phone Number": { type: String },
        "Gender": { type: String, enum: ["Male", "Female", "Other"] },
        "Age": { type: Number },

        "Customer Region": { type: String },
        "Customer Type": { type: String },

        "Product ID": { type: String },
        "Product Name": { type: String },
        "Brand": { type: String },
        "Product Category": { type: String },

        "Tags": { type : String },

        "Quantity": { type: Number },
        "Price per Unit": { type: Number },
        "Discount Percentage": { type: Number },
        "Total Amount": { type: Number },
        "Final Amount": { type: Number },

        "Payment Method": { type: String },
        "Order Status": { type: String },
        "Delivery Type": { type: String },

        "Store ID": { type: String },
        "Store Location": { type: String },

        "Salesperson ID": { type: String },
        "Employee Name": { type: String }
    }
);

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
