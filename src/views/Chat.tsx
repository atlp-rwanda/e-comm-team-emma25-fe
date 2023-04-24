import React from "react";
import Navbar from "../components/Navbar";
import Chatscreen from "../components/Chatcomponents/chatmessage";

function Chat() {
  return (
    <div>
      <Navbar iconNumber={2} />
      <Chatscreen />
    </div>
  );
}

export default Chat;
