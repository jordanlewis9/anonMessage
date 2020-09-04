import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReplyCard from "./replies/ReplyCard";
import NewReply from "./replies/NewReply";
import DeleteForm from "./utils/DeleteForm";
import Report from "./utils/Report";

const Thread = () => {
  const [thread, setThread] = useState({});
  const [boardColor, setBoardColor] = useState({ color: "black" });
  const [pageNumber, setPageNumber] = useState(1);
  let { board, thread_id } = useParams();
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(
          `/api/replies/${board}?thread_id=${thread_id}`
        );
        if (response.data.status === "fail") {
          console.log("failed");
          setThread({ status: "fail" });
        } else {
          console.log("success");
          setThread(response.data.thread);
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.status);
          setThread({ status: "fail" });
        } else {
          setThread({ status: "unidentified error" });
        }
      }
      try {
        const boardResponse = await axios.get(`/api/${board}`);
        setBoardColor({ color: boardResponse.data.board.color });
      } catch (error) {
        if (error.response.status === 400) {
          console.log("board failed, shouldnt see this");
        }
      }
    };
    fetchReplies();
  }, [board, thread_id]);
  console.log(thread);
  const showPagination = (replies) => {
    if (replies.length <= 10) {
      return "";
    }
    return (
      <div>
        {pageNumber === 1 ? (
          ""
        ) : (
          <button onClick={() => setPageNumber(pageNumber - 1)}>Back</button>
        )}
        <p>{pageNumber}</p>
        {pageNumber * 10 >= replies.length ? (
          ""
        ) : (
          <button onClick={() => setPageNumber(pageNumber + 1)}>Forward</button>
        )}
      </div>
    );
  };
  if (thread.status === "fail") {
    return (
      <h2>
        No board or thread could be found with the given parameters. Please
        return to our <Link to="/">home</Link> page.
      </h2>
    );
  } else if (thread.status === "unidentified error") {
    return (
      <h2>
        There has been an {thread.status}. Please return to our{" "}
        <Link to="/">home</Link> page or try again.
      </h2>
    );
  } else if (!thread.name) {
    console.log(thread);
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <Link to={`/b/${board}`} className="board-link">
          {board}
        </Link>
        <div className="main-thread-container">
          <h3>{thread.name}</h3>
          <p>{thread.text}</p>
          <Report thread={true} threadId={thread.id} board={board} />
          <DeleteForm thread={true} threadId={thread.id} board={board} />
        </div>
        <div>
          {thread.replies
            ? thread.replies
                .slice(pageNumber * 10 - 10, pageNumber * 10)
                .map((reply) => (
                  <ReplyCard
                    key={reply._id}
                    text={reply.text}
                    replyId={reply._id}
                    threadId={thread.id}
                    board={board}
                    reported={reply.reported}
                    borderColor={boardColor.color}
                    timeStamp={reply.created_on}
                  />
                ))
            : "Loading..."}
        </div>
        {showPagination(thread.replies)}
        <NewReply threadId={thread.id} board={board} />
      </div>
    );
  }
};

export default Thread;
