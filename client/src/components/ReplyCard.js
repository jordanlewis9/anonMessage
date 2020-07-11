import React from "react";
import DeleteForm from "./DeleteForm";

const ReplyCard = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <DeleteForm
        replyId={props.replyId}
        threadId={props.threadId}
        boardId={props.boardId}
      />
    </div>
  );
};

export default ReplyCard;
