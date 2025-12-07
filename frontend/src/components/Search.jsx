import { useRecoilState } from 'recoil';
import { filterAtom, refreshAtom } from '../atoms/filterAtom';
import { useState, useEffect, use } from 'react';

export default function Search() {
    const  setFilter = useRecoilState(filterAtom)[1];
    const [refresh, setRefresh] = useRecoilState(refreshAtom);
    const [input, setInput] = useState("");


  useEffect(() => {
    if (refresh) {
      setInput([]);
      setRefresh(false);
    }
  }, [refresh]);
        

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
    }, [input]);

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
