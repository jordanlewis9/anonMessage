import React, { useState } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";

const NewReply = (props) => {
  const [reply, setReply] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [validReply, setValidReply] = useState(null);
  const [validPassword, setValidPassword] = useState({
    valid: null,
    message: "",
  });
  // const handleChange = (e) => {
  //   setReply = e.target.value;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reply.length < 1) {
      setValidReply(false);
      return;
    }
    console.log(props.threadId);
    try {
      await axios.post(`/api/replies/${props.board}`, {
        text: reply,
        delete_password: deletePassword,
        thread_id: props.threadId,
      });
      document.location.reload(true);
    } catch (err) {
      console.log(err.response.data.message.split(" ").slice(4).join(" "));
      setValidPassword({
        valid: false,
        message: err.response.data.message.split(" ").slice(4).join(" "),
      });
    }
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
        {validReply === false ? (
          <p>Reply must contain at least one character</p>
        ) : (
          ""
        )}
        <label className="new-reply__password" htmlFor="delete-password">
          Set Delete Password:
        </label>
        <div>
          <input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            onFocus={() => setValidPassword({ valid: null, message: "" })}
            className="new-reply__password__text"
            name="delete-password"
            data-tip="React-tooltip"
          />
          {validPassword.valid === false ? (
            <ReactTooltip>{validPassword.message}</ReactTooltip>
          ) : (
            ""
          )}
        </div>
        <input type="submit" value="Reply" className="new-reply__submit" />
      </form>
    </div>
  );
};

export default NewReply;
