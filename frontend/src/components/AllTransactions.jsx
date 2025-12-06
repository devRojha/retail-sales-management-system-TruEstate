import { useRecoilState, useRecoilValue } from 'recoil'
import '../styles/allTransactions.css'
import TransactionsHeader from './TransactionsHeader'
import { filterAtom } from '../atoms/filterAtom'
import { fetchSalesData } from '../api/api';
import { useEffect } from 'react';
import { useState } from 'react';
import Transaction from './Transaction';
import { summaryAtom } from '../atoms/summary';

export default function AllTransactions() {
    const filters = useRecoilValue(filterAtom);
    const setSummary = useRecoilState(summaryAtom)[1];

    const [data, setData] = useState({
        sales: [],
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const temp = await fetchSalesData(filters);
                const summary = {
                    totalQuantity: temp.summary.totalQuantity,
                    totalAmount: temp.summary.totalAmount,
                    totalDiscount: temp.summary.totalAmount - temp.summary.finalAmount,
                };
                setSummary(summary);
                setData(temp);
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, [filters]);

    return (
        <div className='all_transactions_details'>
            <TransactionsHeader />

            <div>
                {data?.sales?.map((item, index) => (
                    <Transaction key={index} data={item} />
                ))}
            </div>
        </div>
    );
}
