import { useState, useRef, useEffect } from "react";
import "../styles/dateDropdown.css";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";

export default function DateDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [refresh, setRefresh] = useRecoilState(refreshAtom);
  const  setFilter = useRecoilState(filterAtom)[1];

  useEffect(() => {
    if (refresh) {
      setFromDate("");
      setToDate("");
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromDate && toDate && new Date(fromDate) <= new Date(toDate)) {
        setFilter((prev) => ({
          ...prev,
          dateStart: fromDate,
          dateEnd: toDate,
          page: 1,
        }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [fromDate, toDate]);

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div className="date_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur}>
      <button
        className="date_dropdown_button"
        type="button"
        onClick={() => setOpen(!open)}
      >
        Date    <img src="/down.png" alt="dropdown arrow" style={{ marginLeft: "5px", width: "10px", height: "10px" }}/>
      </button>

      {open && (
        <div className="date_dropdown_container">
          <label>
            <span>From:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>

          <label style={{ marginTop: "10px" }}>
            <span>To:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
