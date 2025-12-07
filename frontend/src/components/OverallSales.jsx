import { use } from 'react'
import '../styles/overallSales.css'
import { useRecoilValue } from 'recoil'
import { summaryAtom } from '../atoms/summary';

export default function OverallSales () {
    const summaryData = useRecoilValue(summaryAtom);
    return (
        <div  className='overall_sales'>
          <div className='total_sales'>
            <div>
                Total Units Soled
            </div>

            <div>
              {summaryData.totalQuantity || 0}
            </div>
          </div>

          <div className='total_amount'>
            <div>
              Total Amount
            </div>

            <div>
              ₹ {summaryData.totalAmount || 0}
            </div>
          </div>

          <div className='total_discount'>
            <div>
              Total Discount
            </div>

            <div>
              ₹ {summaryData.totalDiscount || 0}
            </div>
          </div>
        </div>
    )
}