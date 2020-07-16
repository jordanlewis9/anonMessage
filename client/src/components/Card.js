import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div
      className={props.board ? "card__thread" : "card__board"}
      style={
        props.borderColor
          ? { borderTop: `3px solid ${props.borderColor}` }
          : null
      }
    >
      <Link
        to={
          props.board
            ? `/b/${props.board}/${props.thread_id}`
            : `/b/${props.name}`
        }
        className={props.board ? "thread__link" : "board__link"}
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
