import { useState } from 'react'
import TransactionsHeader from './components/TransactionsHeader';
import Transaction from './components/Transaction';
import GenderDropdown from './components/GenderDropdown';
import PaymentMethodDropdown from './components/PaymentMethodDropdown';
import CustomerRegionDropdown from './components/CustomerRegionDropDown';
import ProductCategoryDropdown from './components/ProductCategoryDropDown';
import TagDropdown from './components/TagDropdown';
import { useRecoilState } from 'recoil';
import { filterAtom } from './atoms/filterAtom';
import Header from './components/Header';
import FilterSort from './components/FilterSort';
import OverallSales from './components/OverallSales';
import AllTransactions from './components/AllTransactions';

function App() {
  
  const [refresh, setRefresh] = useRecoilState(filterAtom);

  return (
    <>
      <div>
          <Header/>
          <FilterSort/>
          <OverallSales/>
          <AllTransactions/>
      </div>
    </>
  )
}

export default App
