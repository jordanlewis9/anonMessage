import React, { useState } from "react";
import axios from "axios";

const NewThread = (props) => {
  const [thread, setThread] = useState("");
  const [name, setName] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/threads/${props.board}`, {
      name: name,
      text: thread,
      delete_password: deletePassword,
    });
    document.location.reload(true);
  };
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Post New Thread</h4>
      <form onSubmit={handleSubmit} className="new-thread-form">
        <label className="new-thread__title">
          Title:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="new-thread__title__text"
          />
        </label>
        <label className="new-thread__text">
          Text:
          <textarea
            value={thread}
            onChange={(e) => setThread(e.target.value)}
            className="new-thread__text__text"
            rows="5"
            cols="50"
          ></textarea>
        </label>
        <label className="new-thread__password">
          Set Delete Password:
          <input
            type="text"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="new-thread__password__text"
          />
        </label>
        <input type="submit" value="Submit" className="new-thread__submit" />
      </form>
    </div>
  );
};

export default NewThread;
