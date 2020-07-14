import React from "react";
import axios from "axios";

const Report = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `/api/${props.thread ? "threads" : "replies"}/${props.board}`,
      {
        thread_id: props.threadId,
        reply_id: props.replyId,
      }
    );
    document.location.reload(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Report" />
      </form>
    </div>
  );
};

export default Report;
