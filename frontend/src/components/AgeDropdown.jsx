import { useState, useRef } from "react";
import RangeSlider from "./RangeSlider";
import "../styles/ageDropdown.css";

export default function AgeDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0, 100]);
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
          <RangeSlider value={value} setValue={setValue} />
        </div>
      )}
    </div>
  );
}