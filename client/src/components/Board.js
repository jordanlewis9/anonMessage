import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import NewThread from "./NewThread";

const Board = () => {
  let { board } = useParams();
  const [threads, setThreads] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/threads/${board}`);
      const boardResponse = await axios.get(`/api/${board}`);
      setCurrentBoard(boardResponse.data);
      setThreads(response.data.threads);
    };
    fetchData();
  }, [board]);
  if (currentBoard.board === null) {
    return (
      <h2 className="board__header">
        This board does not exist. Please return to our <Link to="/">home</Link>{" "}
        page.
      </h2>
    );
  } else if (!currentBoard.status) {
    return <h2 className="board__header">Loading...</h2>;
  } else {
    return (
      <div>
        <h2 className="board__header">{board}</h2>
        <div className="board__thread-container">
          {threads.map((thread) => (
            <Card
              key={thread.name}
              name={thread.name}
              thread_id={thread.id}
              board={board}
              replies={thread.replies}
              borderColor={currentBoard.board.color}
            />
          ))}
        </div>
        <NewThread board={board} />
      </div>
    );
  }
};

export default Board;
