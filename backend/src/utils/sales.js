



export function getSalesSummary(sales) {
    const summary = sales.reduce(
        (acc, sale) => {
            acc.totalQuantity += sale["Quantity"] || 0;
            acc.totalAmount += sale["Total Amount"] || 0;
            acc.finalAmount += sale["Final Amount"] || 0;
            return acc;
        },
        { 
            totalQuantity: 0, 
            totalAmount: 0, 
            finalAmount: 0 
        }
    );

    return summary;
}
