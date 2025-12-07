import Header from './components/Header';
import FilterSort from './components/FilterSort';
import OverallSales from './components/OverallSales';
import AllTransactions from './components/AllTransactions';

function App() {

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
