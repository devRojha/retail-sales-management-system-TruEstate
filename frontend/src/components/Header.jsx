import { useState } from 'react';
import '../styles/header.css'
import Search from './Search';

export default function Header () {
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className='header'>
            <div className='header_content'>Sales Management System</div>
            
            {/* search */}
            <Search />
          </div>
    )
}