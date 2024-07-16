import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
    const [expanded, setExpanded] = useState(true);
    
    const toggleSidebar = () => {
        setExpanded(!expanded);
    };
    
    return (
        <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
            <div className="top">
                <img 
                    className='menu' 
                    src={assets.menu_icon} 
                    alt="Menu Icon" 
                    onClick={toggleSidebar}
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat Icon" />
                    {expanded && <p>New Chat</p>}
                </div>
                {expanded && (
                    <div className="recent">
                        <p className='recent-title'>Recent</p>
                        <div className="recent-entry">
                            <img src={assets.message_icon} alt="Message Icon" />
                            <p>What is react...</p>
                        </div>
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
                    {expanded && <p>Setting</p>}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;