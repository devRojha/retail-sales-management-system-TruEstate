import { useState } from 'react';
import '../styles/header.css'

export default function Header () {
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className='header'>
            <div className='header_content'>Sales Management System</div>
            <input className='search_input' placeholder='Search with name or phone' onChange={(e) => setSearchInput(e.target.value)}></input>
          </div>
    )
}