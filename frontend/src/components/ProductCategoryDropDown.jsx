import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";
import '../styles/productCategoryDropdown.css'

function ProductCategoryDropdown() {
  const options = ["Beauty", "Electronics", "Clothing"]; // unique categories

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
      category: updated,
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
      className="product_category_dropdown"
      ref={containerRef}
      tabIndex={0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button className="product_category_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Product Category  <img src="/down.png" alt="dropdown arrow" style={{ marginLeft: "3px", width: "6px", height: "6px" }}/>
      </button>

      {open && (
        <div className="product_category_dropdown_container" >
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

export default ProductCategoryDropdown;
