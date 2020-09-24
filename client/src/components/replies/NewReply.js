import React, { useState } from "react";
import axios from "axios";

const NewReply = (props) => {
  const [reply, setReply] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [validReply, setValidReply] = useState({
    valid: null,
    message: "",
  });
  const [validPassword, setValidPassword] = useState({
    valid: null,
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidReply({
      valid: null,
      message: "",
    });
    setValidPassword({
      valid: null,
      message: "",
    });
    console.log(props.threadId);
    try {
      await axios.post(`/api/replies/${props.board}`, {
        text: reply,
        delete_password: deletePassword,
        thread_id: props.threadId,
      });
      document.location.reload(true);
    } catch (err) {
      if (reply.length < 1 && deletePassword.length < 3) {
        setValidReply({
          valid: false,
          message: "A reply must contain at least 1 character",
        });
        setValidPassword({
          valid: false,
          message: "A password must contain at least 3 characters",
        });
        return;
      } else if (reply.length < 1 && deletePassword.length > 8) {
        setValidReply({
          valid: false,
          message: "A reply must contain at least 1 character",
        });
        setValidPassword({
          valid: false,
          message: "A password must contain at most 8 characters",
        });
        return;
      } else if (reply.length > 10000) {
        setValidReply({
          valid: false,
          message: "A reply can only contain up to 10,000 characters",
        });
        return;
      } else if (reply.length < 1) {
        setValidReply({
          valid: false,
          message: "A reply must contain at least 1 character",
        });
        return;
      } else if (deletePassword.length < 3) {
        setValidPassword({
          valid: false,
          message: "A password must contain at least 3 characters",
        });
        return;
      } else if (deletePassword.length > 8) {
        setValidPassword({
          valid: false,
          message: "A password must contain at most 8 characters",
        });
        return;
      }
    }
  };
  return (
    <div className="new-reply__container">
      <form onSubmit={handleSubmit} className="new-reply__form">
        <label className="new-reply__text" htmlFor="text">
          Reply:
        </label>
        <div className="new-reply__input__containers new-reply__textarea__container">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className={`new-reply__text__text ${
              validReply.valid === false ? "input__error" : ""
            }`}
            name="text"
          ></textarea>
          {validReply.valid === false ? (
            <p className="new-reply__error">{validReply.message}</p>
          ) : (
            ""
          )}
        </div>
        <label className="new-reply__password" htmlFor="delete-password">
          Set Delete Password:
        </label>
        <div className="new-reply__input__containers new-reply__password__container">
          <input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            name="delete-password"
            className={`new-reply__password__input ${
              validPassword.valid === false ? "input__error" : ""
            }`}
          />
          {validPassword.valid === false ? (
            <p className="new-reply__error">{validPassword.message}</p>
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
