import React from "react";
import DeleteForm from "../utils/DeleteForm";
import Report from "../utils/Report";
import { timeFormat } from "../utils/timeFormat";

const ReplyCard = (props) => {
  return (
    <div
      className="card__reply"
      style={{ borderBottom: `1px solid ${props.borderColor}` }}
    >
      <p>{timeFormat(new Date(props.timeStamp).toLocaleString())}</p>
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
