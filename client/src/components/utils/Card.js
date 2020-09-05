import React from "react";
import { Link } from "react-router-dom";
import { timeFormat } from "./timeFormat";

const Card = (props) => {
  const renderTime = () => {
    if (props.replies && props.replies[0]) {
      return (
        <p>
          Last reply on{" "}
          {timeFormat(new Date(props.replies[0].created_on).toLocaleString())}
        </p>
      );
    } else if (props.replies) {
      return (
        <p>
          Created on{" "}
          {timeFormat(new Date(props.threadCreatedOn).toLocaleString())}
        </p>
      );
    } else {
      return null;
    }
  };
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
      {renderTime()}
    </div>
  );
};

export default Card;
