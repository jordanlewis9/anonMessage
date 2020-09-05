import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "./utils/Card";
import NewThread from "./threads/NewThread";
import Pagination from "./utils/Pagination";

const Board = () => {
  let { board } = useParams();
  const [threads, setThreads] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadResponse = await axios.get(`/api/threads/${board}`);
        const boardResponse = await axios.get(`/api/${board}`);
        if (boardResponse.status === 200 && threadResponse.status === 200) {
          setThreads(threadResponse.data.threads);
          setCurrentBoard(boardResponse.data);
        }
      } catch (error) {
        if (error.response.status === 400) {
          setCurrentBoard({ board: null });
        } else {
          setCurrentBoard({
            error: "There has been an unidentified error. Please try again.",
          });
        }
      }
    };
    fetchData();
  }, [board]);
  console.log(threads);
  const showPagination = (threads) => {
    if (threads.length <= 10) {
      return "";
    }
    return (
      <div>
        {pageNumber === 1 ? (
          ""
        ) : (
          <button onClick={() => setPageNumber(pageNumber - 1)}>Back</button>
        )}
        <p>{pageNumber}</p>
        {pageNumber * 10 >= threads.length ? (
          ""
        ) : (
          <button onClick={() => setPageNumber(pageNumber + 1)}>Forward</button>
        )}
      </div>
    );
  };
  if (currentBoard.board === null) {
    return (
      <h2 className="board__header">
        This board does not exist. Please return to our <Link to="/">home</Link>{" "}
        page.
      </h2>
    );
  } else if (!currentBoard.status) {
    return <h2 className="board__header">Loading...</h2>;
  } else if (currentBoard.error) {
    return <h2 className="board__header">{currentBoard.error}</h2>;
  } else {
    return (
      <div>
        <h2 className="board__header">{board}</h2>
        <div className="board__thread-container">
          {threads
            .slice(pageNumber * 10 - 10, pageNumber * 10)
            .map((thread) => (
              <Card
                key={thread.name}
                name={thread.name}
                thread_id={thread.id}
                board={board}
                replies={thread.replies}
                threadCreatedOn={thread.created_on}
                borderColor={currentBoard.board.color}
              />
            ))}
        </div>
        <Pagination
          topic={threads}
          stateFn={setPageNumber}
          stateNum={pageNumber}
        />
        <NewThread board={board} />
      </div>
    );
  }
};

export default Board;
