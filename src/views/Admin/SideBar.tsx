import React from "react";
import "./SideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RolePermission from "./rolePermission";
import NavbarTop from "../../components/NavbarTop";

const SideBar = () => {
  return (
    <div className="sideContainer">
      <div className="sidebar">
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <DashboardIcon className="icon" />
              <span>dashboard</span>
            </li>

            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="table">
        <NavbarTop />
        <RolePermission />
      </div>
    </div>
  );
};

export default SideBar;
