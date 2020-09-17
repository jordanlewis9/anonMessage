import React, { useState } from "react";
import axios from "axios";

const DeleteForm = (props) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const deletePost = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `/api/${props.thread ? "threads" : "replies"}/${props.board}`,
        {
          data: {
            reply_id: props.replyId,
            thread_id: props.threadId,
            delete_password: password,
          },
        }
      );
      setPasswordError({ error: false, message: "" });
      props.thread
        ? document.location.replace(`/b/${props.board}`)
        : document.location.reload(true);
    } catch (err) {
      if (err.response.status === 400) {
        setPasswordError({ error: true, message: err.response.data.message });
        return;
      } else {
        document.location.replace(`/error`);
      }
    }
  };
  return (
    <div>
      <form onSubmit={(e) => deletePost(e)}>
        <label>
          Delete Password:
          <input
            name="deletePassword"
            type="password"
            className="input__delete__reply"
            onChange={(e) => passwordChange(e)}
            value={password}
          />
          {passwordError.error && <p>{passwordError.message}</p>}
        </label>
        <input type="submit" className="button__delete" value="Delete" />
      </form>
    </div>
  );
};

export default DeleteForm;
