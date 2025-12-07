import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { filterAtom, refreshAtom } from "../atoms/filterAtom";
import '../styles/paymentMethodDropdown.css'

function PaymentMethodDropdown() {
  const options = [
    "Cash",
    "UPI",
    "Credit Card",
    "Debit Card",
    "Wallet",
    "Netbanking",
  ];

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
      payment: updated,
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
    <div className="payment_method_dropdown" ref={containerRef} tabIndex={0} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button className="payment_method_dropdown_button" type="button" onClick={() => setOpen(!open)}>
        Select Payment Methods  <img src="/down.png" alt="dropdown arrow" style={{ marginLeft: "0px", width: "5px", height: "5px" }}/>
      </button>

      {open && (
        <div className="payment_method_dropdown_container" >
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

export default PaymentMethodDropdown;
