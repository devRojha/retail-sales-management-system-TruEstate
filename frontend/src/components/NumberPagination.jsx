import { useSetRecoilState } from "recoil";
import { filterAtom } from "../atoms/filterAtom";
import "../styles/pagination.css";

export default function NumberPagination({ page, totalPages }) {
  const setFilter = useSetRecoilState(filterAtom);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setFilter((prev) => ({ 
        ...prev, 
        page: p 

    }));
  };

  let pagesToShow = [];

  if (page <= 5) {
    const max = Math.min(totalPages, 6);
    for (let p = 1; p <= max; p++) pagesToShow.push(p);
  } 
  else {
    let start = page - 5;
    let end = page + 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - 5);
    }
    for (let p = start; p <= end; p++) pagesToShow.push(p);
  }

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container">
        {pagesToShow.map((p) => (
          <div
            key={p}
            onClick={() => goToPage(p)}
            className={`page-box ${p === page ? "active" : ""}`}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
