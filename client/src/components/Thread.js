import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
      <h2>{thread.name}</h2>
      <div>
        {thread.replies
          ? thread.replies.map((reply) => (
              <ReplyCard key={reply._id} text={reply.text} />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Thread;
