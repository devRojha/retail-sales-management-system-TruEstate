import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";
import '../styles/customerRegionDropdown.css'


function CustomerRegionDropdown() {
  const options = ["Central", "East", "West", "North", "South"];

  const [selected, setSelected] = useState([]);
  const [refresh, setRefresh] = useRecoilState(refreshAtom);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  
  const setFilter = useRecoilState(filterAtom)[1];

  useEffect(() => {
    if (refresh) {
      setSelected([]);
      setRefresh(false);
    }
  }, [refresh]);

  // toggle option in selected array
  const toggleOption = (option) => {
    let updated;

    if (selected.includes(option)) {
      updated = selected.filter((o) => o !== option);
    } 
    else {
      updated = [...selected, option];
    }

    // update local state
    setSelected(updated);

    // update global Recoil state
    setFilter((prev) => ({
      ...prev,
      region: updated,
      page: 1  // optional: reset page (thought always stating from the first page)
    }));
  };

  // close dropdown when clicking outside
  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  // close dropdown on escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div
      className="customer_region_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button className="customer_region_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Customer Region
      </button>

      {open && (
        <div className="customer_region_dropdown_container" >
          {options.map((option) => (
            <label key={option} style={{ display: "block", cursor: "pointer" }}>
              <input type="checkbox" checked={selected.includes(option)} onChange={() => toggleOption(option)} style={{ marginRight: "5px" }}/>
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerRegionDropdown;
