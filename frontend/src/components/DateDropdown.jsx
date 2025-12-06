import { useState, useRef } from "react";
import "../styles/dateDropdown.css"; // optional

export default function DateDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="date_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur}>
      <button className="date_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Date
      </button>

      {open && (
        <div className="date_dropdown_container">
          <label style={{ display: "block" }}>
            <span>From:</span>
            <input type="date" onChange={(e) => {
                // state managementt - setFromDate(e.target.value);
              }}
            />
          </label>

          <label style={{ display: "block", marginTop: "10px" }}>
            <span>To:</span>
            <input type="date"
              onChange={(e) => {
                // state management - ToDate(e.target.value);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}