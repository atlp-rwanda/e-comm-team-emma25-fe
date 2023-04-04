/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, { useState } from "react";
import "./changePassword.scss";

function ChangePassword() {
  // const NewPasswordInput = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isPasswordMatch = () => {
    return newPassword === confirmPassword;
  };

  return (
    <div className="login-container">
      <form action="">
        <h2 className="reset">Password Reset </h2>
        <div className="emailLink">
          <input type="text" placeholder="EmailAddress*" />
        </div>
        <div className="Token">
          <input type="text" placeholder="Enter Token*" />
        </div>

        <div className="Newpass">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            placeholder="Enter New Password*"
            onChange={handleNewPasswordChange}
          />
          <button onClick={handleToggleNewPassword}>
            {showNewPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <div className="confirmpassword">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm Password*"
            onChange={handleConfirmPasswordChange}
          />

          <button onClick={handleToggleConfirmPassword}>
            {showConfirmPassword ? "Hide" : "Show"} Password
          </button>
          {!isPasswordMatch() && <div>Passwords do not match.</div>}
        </div>
        <div className="CONFIRM">
          <a href="./Signin.tsx">
            <button>CONFIRM</button>
          </a>
        </div>
      </form>
    </div>
  );
}
// }
export default ChangePassword;
