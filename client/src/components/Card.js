import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card">
      <Link
        to={
          props.board
            ? `/b/${props.board}/${props.thread_id}`
            : `/b/${props.name}`
        }
      >
        {props.name}
      </Link>
      {props.replies
        ? props.replies.map((reply) => <div key={reply._id}>{reply.text}</div>)
        : ""}
    </div>
  );
};

export default Card;
