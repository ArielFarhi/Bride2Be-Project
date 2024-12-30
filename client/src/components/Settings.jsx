// src/components/Settings.jsx
import React from "react";
import { FaLock, FaUser, FaShieldAlt, FaQuestionCircle, FaUserPlus, FaBell, FaCog, FaImage } from "react-icons/fa";
import Header from "./Header";

const Settings = () => {
  const settingsOptions = [
    { id: 1, icon: <FaLock />, label: "Privacy" },
    { id: 2, icon: <FaUser />, label: "Account" },
    { id: 3, icon: <FaShieldAlt />, label: "Security" },
    { id: 4, icon: <FaQuestionCircle />, label: "About" },
    { id: 5, icon: <FaUserPlus />, label: "Invite Friends" },
    { id: 6, icon: <FaImage />, label: "Change Background" },
    { id: 7, icon: <FaBell />, label: "Notifications" },
    { id: 8, icon: <FaCog />, label: "Admin Management" },
  ];

  return (
    <div>
        <Header />
        <div className="settings-page">
        <h1>Settings</h1>
        <div className="settings-search">
            <input type="text" placeholder="Search" />
        </div>
        <ul className="settings-list">
            {settingsOptions.map((option) => (
            <li key={option.id} className="settings-item">
                <span className="settings-icon">{option.icon}</span>
                <span className="settings-label">{option.label}</span>
                <span className="settings-arrow">&gt;</span>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
};

export default Settings;
