import React from "react";
import axios from "axios";

const DeleteForm = (props) => {
  const deletePost = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/replies/${props.boardId}`, {
      _id: props.replyId,
      thread_id: props.threadId,
      delete_password: document.getElementById("deletePassword").value,
    });
  };
  return (
    <div>
      <form>
        <label for="deletePassword">Delete Password:</label>
        <input name="deletePassword" type="text" id="deletePassword" />
        <input type="submit" value="Submit" onSubmit={(e) => deletePost(e)} />
      </form>
    </div>
  );
};

export default DeleteForm;
