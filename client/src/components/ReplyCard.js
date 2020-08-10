import React from "react";
import DeleteForm from "./DeleteForm";
import Report from "./Report";

const ReplyCard = (props) => {
  return (
    <div
      className="card__reply"
      style={{ borderBottom: `1px solid ${props.borderColor}` }}
    >
      <p>{props.text}</p>
      <Report
        replyId={props.replyId}
        threadId={props.threadId}
        board={props.board}
      />
      <DeleteForm
        replyId={props.replyId}
        threadId={props.threadId}
        board={props.board}
      />
    </div>
  );
};

export default ReplyCard;
