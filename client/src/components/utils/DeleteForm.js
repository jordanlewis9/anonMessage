import React, { useState } from "react";
import axios from "axios";

const DeleteForm = (props) => {
  const [password, setPassword] = useState("");
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const deletePost = async (e) => {
    e.preventDefault();
    await axios.delete(
      `/api/${props.thread ? "threads" : "replies"}/${props.board}`,
      {
        data: {
          _id: props.replyId,
          thread_id: props.threadId,
          delete_password: password,
        },
      }
    );
    props.thread
      ? document.location.replace(`/b/${props.board}`)
      : document.location.reload(true);
  };
  console.log(props.replyId, props.threadId, password);
  return (
    <div>
      <form onSubmit={(e) => deletePost(e)}>
        <label>
          Delete Password:
          <input
            name="deletePassword"
            type="text"
            className="input__delete__reply"
            onChange={(e) => passwordChange(e)}
          />
        </label>
        <input type="submit" className="button__delete" value="Delete" />
      </form>
    </div>
  );
};

export default DeleteForm;
