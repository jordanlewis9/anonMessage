import React, { useState } from "react";
import axios from "axios";

const NewThread = (props) => {
  const [thread, setThread] = useState("");
  const [name, setName] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`/api/threads/${props.board}`, {
        name: name,
        text: thread,
        delete_password: deletePassword,
      });
      document.location.reload(true);
    } catch (err) {
      console.log(err.message);
    }
  };
  const invalidPassword = (e) => {
    let message;
    if (deletePassword.length < 3) {
      message = `<p>Passwords must be greater than ${deletePassword.length} characters long.`;
    } else {
      message = `<p>Passwords must be less than ${deletePassword.length} characters long.`;
    }
    e.target.insertAdjacentHTML("afterend", message);
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
        <label className="new-thread__password" htmlFor="deletePassword">
          Set Delete Password:
        </label>
        <input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="new-thread__password__text"
          name="deletePassword"
          minLength="3"
          maxLength="8"
          onInvalid={(e) => invalidPassword(e)}
        />
        <input type="submit" value="Submit" className="new-thread__submit" />
      </form>
    </div>
  );
};

export default NewThread;
