import { useState, useRef } from "react";
import "../styles/ageDropdown.css";

export default function AgeDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="age_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur}>
      <button className="age_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Age
      </button>

      {open && (
        <div className="age_dropdown_container">
          <input type="number" placeholder="From Age" onChange={(e) => {

          }} />
          <input type="number" placeholder="To Age" onChange={(e) => {
          }} />
        </div>
      )}
    </div>
  );
}