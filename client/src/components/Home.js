import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./utils/Card";

const Home = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/boards");
        setBoards(response.data.boards);
      } catch (err) {
        console.log(err);
        document.location.replace("/error");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <ul className="board__list">
        {boards.map((board) => {
          return <Card key={board.name} name={board.name} board={false} />;
        })}
      </ul>
    </div>
  );
};

export default Home;
