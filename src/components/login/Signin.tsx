/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import "./Signin.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { email, password };
    const jsonFormData = JSON.stringify(formData);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3ArdFAo_HoGS8AYkruUT_2d-Vo0ZzA3EGt.dwKczh%2BU1%2FqYaeTX8EPa0FU6TIuSKmoSaS5NdN7FM1c; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY1MCwiZW1haWwiOiJ2aXZpbmUxM0BnbWFpbC5jb20iLCJuYW1lIjoiVml2aW5lIEtLSyIsInBob25lIjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MDc3NTY2MSwiZXhwIjoxNjgxMzgwNDYxfQ.3zwVn6YN3GhNFFl3WWZS_v3J11AXQMa_vLGHm0dX034"
    );

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: jsonFormData,
      redirect: "follow",
    };

    fetch("https://e-comm-team-emma25-bn.onrender.com/login", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    navigate("/products");
  };

  // const [] = useState(null);
  return (
    <div className="login-container">
      <div className="form-buttons">
        <h2>Sign In</h2>
        <h3 className="shop">!SHOP</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="email">
          <input
            type="text"
            placeholder="EmailAddress*"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password*"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="forgot">
          <h4>
            Forgot Password
            {/* <a href="/passwordLink.tsx">Forgot Password</a> */}
          </h4>
        </div>
        <div className="sign-btn">
          <button>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
