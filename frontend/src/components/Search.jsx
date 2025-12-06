import { useRecoilState } from 'recoil';
import { filterAtom } from '../atoms/filterAtom';
import { useState, useEffect } from 'react';

export default function Search() {
    const [, setFilter] = useRecoilState(filterAtom);
    const [input, setInput] = useState("");

    // Debounce effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter(prev => ({
                ...prev,
                search: input,
                page: 1
            }));
        }, 500);  // wait 500ms after user stops typing

        return () => clearTimeout(timeout); // cleanup previous timer
    }, [input, setFilter]);

    return (
            <>
                <input
                    className='search_input'
                    placeholder='Search with name or phone'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </>
    );
}
