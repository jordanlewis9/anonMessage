import React from "react";
import DeleteForm from "./DeleteForm";

const ReplyCard = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <DeleteForm
        replyId={props.replyId}
        threadId={props.threadId}
        board={props.board}
      />
    </div>
  );
};

export default ReplyCard;
