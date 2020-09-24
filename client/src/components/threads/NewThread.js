import React, { useState } from "react";
import axios from "axios";

const NewThread = (props) => {
  const [thread, setThread] = useState("");
  const [name, setName] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [validThread, setValidThread] = useState({
    valid: null,
    message: "",
  });
  const [validName, setValidName] = useState({
    valid: null,
    message: "",
  });
  const [validPassword, setValidPassword] = useState({
    valid: null,
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidThread({
      valid: null,
      message: "",
    });
    setValidName({
      valid: null,
      message: "",
    });
    setValidPassword({
      valid: null,
      message: "",
    });
    try {
      await axios.post(`/api/threads/${props.board}`, {
        name: name,
        text: thread,
        delete_password: deletePassword,
      });
      document.location.reload(true);
    } catch (err) {
      if (thread.length < 1 || thread.length > 10000) {
        setValidThread({
          valid: false,
          message: "A thread must contain between 1 and 10,000 characters",
        });
      }
      if (name.length < 1 || name.length > 200) {
        setValidName({
          valid: false,
          message: "A title must contain between 1 and 200 characters",
        });
      }
      if (deletePassword.length < 3 || deletePassword.length > 8) {
        setValidPassword({
          valid: false,
          message: "A password must contain between 3 and 8 characters",
        });
      }
      return;
    }
  };
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Post New Thread</h4>
      <form onSubmit={handleSubmit} className="new-thread-form">
        <label className="new-thread__title" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="new-thread__title__text"
          name="title"
        />
        {validName.valid === false ? <p>{validName.message}</p> : ""}
        <label className="new-thread__text" htmlFor="text">
          Text:
        </label>
        <textarea
          value={thread}
          onChange={(e) => setThread(e.target.value)}
          className="new-thread__text__text"
          rows="5"
          name="text"
        ></textarea>
        {validThread.valid === false ? <p>{validThread.message}</p> : ""}
        <label className="new-thread__password" htmlFor="deletePassword">
          Set Delete Password:
        </label>
        <input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="new-thread__password__text"
          name="deletePassword"
        />
        {validPassword.valid === false ? <p>{validPassword.message}</p> : ""}
        <input type="submit" value="Submit" className="new-thread__submit" />
      </form>
    </div>
  );
};

export default NewThread;
