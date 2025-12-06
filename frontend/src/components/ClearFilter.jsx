import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";
import { filterParams } from "../utils/filterParams";



export default function ClearFilter () {
    const setRefresh = useRecoilState(refreshAtom)[1];
    const setFilter = useRecoilState(filterAtom)[1];
    return (
        <>
            <img src='refresh.png' onClick={() => {
                setRefresh(true);
                setFilter(filterParams)
                console.log('filters cleared')
                setTimeout(() => setRefresh(false), 50);
              }} className='refresh_button' />
        </>
    )
}