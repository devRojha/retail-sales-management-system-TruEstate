import '../styles/overallSales.css'

export default function OverallSales () {
    return (
        <div  className='overall_sales'>
          <div className='total_sales'>
            <div>
              Total Units Sold
            </div>

            <div>
              {/* {data.total_units_sold} */}
            </div>
          </div>

          <div className='total_amount'>
            <div>
              Total Amount
            </div>

            <div>
              {/* {data.total_amount} */}
            </div>
          </div>

          <div className='total_discount'>
            <div>
              Total Discount
            </div>

            <div>
              {/* {data.total_discount} */}
            </div>
          </div>
        </div>
    )
}