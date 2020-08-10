import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReplyCard from "./ReplyCard";
import NewReply from "./NewReply";
import DeleteForm from "./DeleteForm";
import Report from "./Report";

const Thread = () => {
  const [thread, setThread] = useState({});
  const [boardColor, setBoardColor] = useState({ color: "black" });
  let { board, thread_id } = useParams();
  useEffect(() => {
    const fetchReplies = async () => {
      const response = await axios.get(
        `/api/replies/${board}?thread_id=${thread_id}`
      );
      const boardResponse = await axios.get(`/api/${board}`);
      setThread(response.data.thread);
      setBoardColor({ color: boardResponse.data.board.color });
    };
    fetchReplies();
  }, [board, thread_id]);
  console.log(thread);
  if (thread === null) {
    return (
      <h2>
        No board or thread could be found by the given names. Please return to
        our <Link to="/">home</Link> page.
      </h2>
    );
  } else if (!thread.name) {
    console.log(thread);
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <Link to={`/b/${board}`} className="board-link">
          {board}
        </Link>
        <div className="main-thread-container">
          <h3>{thread.name}</h3>
          <p>{thread.text}</p>
          <Report thread={true} threadId={thread.id} board={board} />
          <DeleteForm thread={true} threadId={thread.id} board={board} />
        </div>
        <div>
          {thread.replies
            ? thread.replies.map((reply) => (
                <ReplyCard
                  key={reply._id}
                  text={reply.text}
                  replyId={reply._id}
                  threadId={thread.id}
                  board={board}
                  reported={reply.reported}
                  borderColor={boardColor.color}
                />
              ))
            : "Loading..."}
        </div>
        <NewReply threadId={thread.id} board={board} />
      </div>
    );
  }
};

export default Thread;
