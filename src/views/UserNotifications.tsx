import React from "react";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

function UserNotifications() {
  return (
    <div>
      <Navbar iconNumber={4} />
      <Notification />
    </div>
  );
}

export default UserNotifications;
