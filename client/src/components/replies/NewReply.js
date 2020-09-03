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
    <div className="new-reply__container">
      <form onSubmit={handleSubmit} className="new-reply__form">
        <label className="new-reply__text" htmlFor="text">
          Reply:
        </label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="new-reply__text__text"
          name="text"
        ></textarea>
        <label className="new-reply__password" htmlFor="delete-password">
          Set Delete Password:
        </label>
        <input
          type="text"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="new-reply__password__text"
          name="delete-password"
        />
        <input type="submit" value="Reply" className="new-reply__submit" />
      </form>
    </div>
  );
};

export default NewReply;
