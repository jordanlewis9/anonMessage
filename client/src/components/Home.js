import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/boards");
      setBoards(response.data.boards);
    };
    fetchData();
  }, []);
  return (
    <div>
      <ul>
        {boards.map((board) => {
          return (
            <li key={board.name}>
              <a href={`/b/${board.name}`}>{board.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
