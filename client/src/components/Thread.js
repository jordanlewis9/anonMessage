import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReplyCard from "./ReplyCard";
import NewReply from "./NewReply";
import DeleteForm from "./DeleteForm";
import Report from "./Report";

const Thread = () => {
  const [thread, setThread] = useState({});
  let { board, thread_id } = useParams();
  useEffect(() => {
    const fetchReplies = async () => {
      const response = await axios.get(
        `/api/replies/${board}?thread_id=${thread_id}`
      );
      setThread(response.data.thread);
    };
    fetchReplies();
  }, [board, thread_id]);
  console.log(thread);
  return (
    <div>
      <Link to={`/b/${board}`}>{board}</Link>
      <div className="main-thread-container">
        <h3>{thread.name}</h3>
        <p>{thread.text}</p>
        <Report thread={true} threadId={thread.id} board={board} />
        <DeleteForm thread={true} threadId={thread.id} board={board} />
        <NewReply threadId={thread.id} board={board} />
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
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Thread;
