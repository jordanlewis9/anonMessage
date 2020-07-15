import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

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
      <ul className="board__list">
        {boards.map((board) => {
          return <Card key={board.name} name={board.name} />;
        })}
      </ul>
    </div>
  );
};

export default Home;
