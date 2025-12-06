import '../styles/filterSort.css'
import ClearFilter from './clearFilter';
import CustomerRegionDropdown from './CustomerRegionDropDown';
import GenderDropdown from './GenderDropdown';
import PaymentMethodDropdown from './PaymentMethodDropdown';
import ProductCategoryDropdown from './ProductCategoryDropDown';
import TagDropdown from './TagDropdown';

export default function FilterSort () {
    return (
        <div className='filter_sort'>
            <div className='filters'>
              <ClearFilter />

              <CustomerRegionDropdown/>
              <GenderDropdown/>

              <select name='Age Range' id='Age Range'>
                <option value="Age">Age</option>
              </select>

              <ProductCategoryDropdown/>
              <TagDropdown/>
              <PaymentMethodDropdown/>

              <div>Date</div>
            </div>
            <div>Sort By:</div>
          </div>
    )
}