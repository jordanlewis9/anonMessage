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
        <label className="new-thread__title" for="title">
          Title:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="new-thread__title__text"
          size="50"
          name="title"
        />
        <label className="new-thread__text" for="text">
          Text:
        </label>
        <textarea
          value={thread}
          onChange={(e) => setThread(e.target.value)}
          className="new-thread__text__text"
          rows="5"
          cols="50"
          name="text"
        ></textarea>
        <label className="new-thread__password" name="deletePassword">
          Set Delete Password:
        </label>
        <input
          type="text"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="new-thread__password__text"
          name="deletePassword"
        />
        <input type="submit" value="Submit" className="new-thread__submit" />
      </form>
    </div>
  );
};

export default NewThread;
