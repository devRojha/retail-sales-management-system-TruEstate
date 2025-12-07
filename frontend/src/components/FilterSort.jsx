import '../styles/filterSort.css'
import ClearFilter from './ClearFilter';
import CustomerRegionDropdown from './CustomerRegionDropDown';
import GenderDropdown from './GenderDropdown';
import PaymentMethodDropdown from './PaymentMethodDropdown';
import ProductCategoryDropdown from './ProductCategoryDropDown';
import TagDropdown from './TagDropdown';
import SortData from './SortData';
import DateDropdown from './DateDropdown';
import AgeDropdown from './AgeDropdown';

export default function FilterSort () {
    return (
        <div className='filter_sort'>
            <div className='filters'>
              <ClearFilter />
              <CustomerRegionDropdown/>
              <GenderDropdown/>
              <AgeDropdown />
              <ProductCategoryDropdown/>
              <TagDropdown/>
              <PaymentMethodDropdown/>
              <DateDropdown />
            </div>
            <SortData />
          </div>
    )
}