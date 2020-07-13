import React, { useState } from "react";
import axios from "axios";

const NewReply = (props) => {
  const [reply, setReply] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  // const handleChange = (e) => {
  //   setReply = e.target.value;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.threadId);
    await axios.post(`/api/replies/${props.board}`, {
      text: reply,
      delete_password: deletePassword,
      thread_id: props.threadId,
    });
    document.location.reload(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Reply:
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
        </label>
        <label>
          Set Delete Password:
          <input
            type="text"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Reply" />
      </form>
    </div>
  );
};

export default NewReply;
