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
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Text:
          <textarea
            value={thread}
            onChange={(e) => setThread(e.target.value)}
          ></textarea>
        </label>
        <label>
          Set Delete Password:
          <input
            type="text"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewThread;
