import React from "react";

const Pagination = ({ topic, stateFn, stateNum }) => {
  if (topic.length <= 10) {
    return "";
  }
  return (
    <div className="pagination">
      {stateNum === 1 ? (
        <button className="pagination__button" style={{ visibility: "hidden" }}>
          Previous Page
        </button>
      ) : (
        <button
          onClick={() => stateFn(stateNum - 1)}
          className="pagination__button"
        >
          Previous Page
        </button>
      )}
      <p className="pagination__number">{stateNum}</p>
      {stateNum * 10 >= topic.length ? (
        <button className="pagination__button" style={{ visibility: "hidden" }}>
          Next Page
        </button>
      ) : (
        <button
          onClick={() => stateFn(stateNum + 1)}
          className="pagination__button"
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default Pagination;
