import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import assets from "../../assets/admin/assets.js"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
         <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
        <img src={assets.history_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/banner" className="sidebar-option">
        <img src={assets.upload} alt="" />
          <p>Add Banner</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
