import React, { useState } from "react";
import axios from "axios";

const DeleteForm = (props) => {
  const [password, setPassword] = useState("");
  const passwordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const deletePost = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/replies/${props.board}`, {
      data: {
        _id: props.replyId,
        thread_id: props.threadId,
        delete_password: password,
      },
    });
    document.location.reload(true);
  };
  console.log(props.replyId, props.threadId, password);
  return (
    <div>
      <form onSubmit={(e) => deletePost(e)}>
        <label for="deletePassword">Delete Password:</label>
        <input
          name="deletePassword"
          type="text"
          className="input__delete__reply"
          onChange={(e) => passwordChange(e)}
        />
        <input type="submit" className="button__delete" value="Delete" />
      </form>
    </div>
  );
};

export default DeleteForm;
