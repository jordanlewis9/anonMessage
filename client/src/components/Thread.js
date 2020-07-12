import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReplyCard from "./ReplyCard";

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
      <h3>{thread.name}</h3>
      <div>
        {thread.replies
          ? thread.replies.map((reply) => (
              <ReplyCard
                key={reply._id}
                text={reply.text}
                replyId={reply._id}
                threadId={thread.id}
                board={board}
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Thread;
