import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const Board = () => {
  let { board } = useParams();
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/threads/${board}`);
      setThreads(response.data.threads);
    };
    fetchData();
  }, [board]);
  console.log(threads);
  return (
    <div>
      <h2>{board}</h2>
      <div>
        {threads.map((thread) => (
          <Card
            key={thread.name}
            name={thread.name}
            thread_id={thread.id}
            board={board}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
