import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';
import menu from '../assets/menu.png';
import { TbLayoutDashboard } from 'react-icons/tb';
import { BsBarChartLine } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSettings, setShowSettings] = useState(false);

  const settingsRef = useRef(null); // 👈 Reference to settings container

  const navItemStyle = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  // ✅ Close settings panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <img src={menu} alt="" />
        </button>
      )}

      <div className={`sidebar ${isMobile ? (isOpen ? 'open' : '') : 'desktop'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Dashboard</h2>
          {isMobile && (
            <button className="close-btn" onClick={closeSidebar}>×</button>
          )}
        </div>

        <nav className="nav">
          <NavLink to="/" className={navItemStyle} onClick={closeSidebar}>
            <TbLayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink to="/statistics" className={navItemStyle} onClick={closeSidebar}>
            <BsBarChartLine size={20} /> Statistics
          </NavLink>

          {/* 👇 Wrap the settings toggle + panel inside this div to track outside clicks */}
          <div ref={settingsRef}>
            <button className="nav-link-btn" onClick={toggleSettings}>
              <FiSettings size={20} /> Settings
            </button>

            {showSettings && (
              <div className="settings-panel">
                <p>Change Password</p>
                <p>Toggle Dark Mode</p>
                <p>Export Data</p>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
