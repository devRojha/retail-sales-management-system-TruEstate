import { useState, useRef, useEffect } from "react";
import "../styles/ageDropdown.css";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";

export default function AgeDropdown() {
  const [open, setOpen] = useState(false);
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [refresh, setRefresh] = useRecoilState(refreshAtom);

  const setFilter = useRecoilState(filterAtom)[1];
  const containerRef = useRef(null);
  
    useEffect(() => {
      if (refresh) {
        setFromAge("");
        setToAge("");
        setRefresh(false);
      }
    }, [refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromAge && toAge && Number(fromAge) <= Number(toAge)) {
        setFilter(prev => ({
          ...prev,
          ageMin: fromAge,
          ageMax: toAge,
          page: 1,
        }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [fromAge, toAge]);

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div
      className="age_dropdown"
      ref={containerRef}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <button
        className="age_dropdown_button"
        type="button"
        onClick={() => setOpen(!open)}
      >
        Age
      </button>

      {open && (
        <div className="age_dropdown_container">
          <input
            type="number"
            placeholder="From Age"
            value={fromAge}
            onChange={(e) => setFromAge(e.target.value)}
          />
          <input
            type="number"
            placeholder="To Age"
            value={toAge}
            onChange={(e) => setToAge(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
