import React, { useState, useContext, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { onSent, prevprompt, setRecentPrompt, newchat } = useContext(Context);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
    setRecentPrompt(prompt);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`sidebar ${expanded ? "expanded" : "collapsed"} ${
        isDarkMode ? "dark-mode" : ""
      }`}
    >
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          onClick={toggleSidebar}
        />
        <div onClick={newchat} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat Icon" />
          {expanded && <p>New Chat</p>}
        </div>
        {expanded && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevprompt.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={index}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {expanded && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {expanded && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Setting Icon" />
          {expanded && <p>Settings</p>}
        </div>
        <div
          className="bottom-item recent-entry dark-mode-toggle"
          onClick={toggleDarkMode}
        >
          <span>{isDarkMode ? "☀️" : "🌙"}</span>
          {expanded && <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
