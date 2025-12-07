import { useState, useRef } from "react";
import "../styles/sortDataDropdown.css";
import { useRecoilState } from "recoil";
import { filterAtom } from "../atoms/filterAtom";

export default function SortDropdown({ setSort }) {
  const options = ["Date (Newest First)", "Quantity", "Customer Name (A-Z)"];
  const val = {"Date (Newest First)" : "date", "Quantity" : "quantity", "Customer Name (A-Z)" : "name"};
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const setFilter = useRecoilState(filterAtom)[1];

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
    setFilter((prev) => ({
        ...prev,
        sort: val[option],
        page: 1  
    }));
    setSort && setSort(option);
    setOpen(false);
  };

  return (
    <div className="sortData_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur}>
      <button className="sortData_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Sort By <img src="/down.png" alt="dropdown arrow" style={{ marginLeft: "5px", width: "10px", height: "10px" }}/>
      </button>

      {open && (
        <div className="sortData_dropdown_container">
          {options.map((option) => (
            <label key={option} style={{ display: "block", cursor: "pointer" }}>
              <input type="radio" name="sort" checked={selected === option} onChange={() => handleSelect(option)}/>
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}