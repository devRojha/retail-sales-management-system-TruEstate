import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";
import '../styles/genderDropdown.css'

function GenderDropdown() {
  const options = ["Male", "Female"];
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
      gender: updated,
      page: 1  // optional: reset page (thought always stating from the first page)
    }));
  };

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="gender_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur}>
      <button className="gender_dropdown_button" type="button" onClick={() => setOpen(!open)} >
        Gender
      </button>

      {open && (
        <div className="gender_dropdown_container">
          {options.map((option) => (
            <label key={option} style={{ display: "block" }}>
              <input type="checkbox" checked={selected.includes(option)} onChange={() => toggleOption(option)} />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenderDropdown;
