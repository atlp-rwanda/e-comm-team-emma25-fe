import React from "react";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <h1>!SHOP</h1>
      <ul>
        <li>
          <a href="LIVINGROOM">LIVINGROOM</a>
        </li>
        <li>DININGROOM</li>
        <li>BEDROOM</li>
        <li>OFFICE</li>
      </ul>
      <div className="buttons">
        {/* <a href="/Signin.tsx"> */}
        {/* </a> */}
        <button>LOGIN</button>
        <button>SIGNUP</button>
      </div>
    </div>
  );
}

export default Navbar;
