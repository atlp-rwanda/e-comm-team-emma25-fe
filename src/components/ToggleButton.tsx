import React, { useState } from "react";
import "../assets/styles/button.style.css";

const ToggleButton = () => {
  const [on, setOn] = useState(false);
  return (
    <button className="button" onClick={() => setOn(!on)}>
      {on ? "ON" : "OFF"}
    </button>
  );
};
export default ToggleButton;
