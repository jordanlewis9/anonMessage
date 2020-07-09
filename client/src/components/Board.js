import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Board = () => {
  let { board } = useParams();
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/threads/${board}`);
      setThreads(response.data.threads);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>{board}</h2>
      <ul>
        {threads.map((thread) => (
          <li>{thread.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
