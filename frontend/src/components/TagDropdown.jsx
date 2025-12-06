import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";
import '../styles/tagDropdown.css'

function TagDropdown() {
  const options = ["Organic", "Skincare", "Portable", "Wireless", "Gadgets", "Casual", "Fashion", "Unisex", "Makeup", "Cotton", "Smart", "Accessories", "Beauty", "Fragrance-free", "Formal"]; // unique categories

  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [refresh, setRefresh] = useRecoilState(refreshAtom);

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
      tags: updated,
      page: 1  // optional: reset page (thought always stating from the first page)
    }));
  };

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button className="tag_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Tags
      </button>

      {open && (
        <div className="tag_dropdown_container">
          {options.map((option) => (
            <label key={option} style={{ display: "block", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                style={{ marginRight: "5px" }}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagDropdown;
