import React from "react";
//import Divider from '@mui/material/Divider';
import "../../assets/styles/message.css";

interface ChatMessage {
  sender: string;
  message: string;
}

function ChatMessage(props: ChatMessage) {
  return (
    <div>
      <h5 className="messageOwner">{props.sender}</h5>
      <div className="messageDiv">
        <p>{props.message} </p>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {};

export default ChatMessage;
