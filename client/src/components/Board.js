import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
      setThreads(response.data.threads);
      setCurrentBoard(boardResponse.data.board);
    };
    fetchData();
  }, [board]);
  console.log(threads);
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
            borderColor={currentBoard.color}
          />
        ))}
      </div>
      <NewThread board={board} />
    </div>
  );
};

export default Board;
