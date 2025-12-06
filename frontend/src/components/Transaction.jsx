

export default function Transaction ({index, data}) {
    return (
        <div className="transaction">
            <div>{data["Transaction ID"]}</div>
            <div>{data["Date"]}</div>
            <div>{data["Customer ID"]}</div>
            <div>{data["Customer Name"]}</div>
            <div>{data["Phone Number"]}</div>
            <div>{data["Gender"]}</div>
            <div>{data["Age"]}</div>
            <div>{data["Product Category"]}</div>
            <div>{data["Quantity"]}</div>
            <div>{data["Total Amount"]}</div>
            <div>{data["Customer Region"]}</div>
            <div>{data["Product ID"]}</div>
            <div>{data["Employee Name"]}</div>
        </div>
    )
}