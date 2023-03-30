import React, { useState } from "react";
import "../assets/styles/button.style.css";

const ToggleButton = () => {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)}>{on ? "ON" : "OFF"}</button>;
};
export default ToggleButton;
