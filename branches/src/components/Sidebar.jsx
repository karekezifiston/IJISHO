import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import menu from '../assets/menu.png'; // your hamburger icon image
import { TbLayoutDashboard } from 'react-icons/tb';
import { BsBarChartLine } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  return (
    <>
      {isMobile && !isOpen && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <img src={menu} alt="menu" />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`sidebar-container ${isMobile ? (isOpen ? 'open' : '') : 'desktop'}`}
      >
        <div className="sidebar-header">
          <h1>Dashboard</h1>
          {isMobile && (
            <button className="close-btn" onClick={closeSidebar}>×</button>
          )}
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li className={isActive('/dashboard') ? 'active' : ''}>
            <Link to="/dashboard" onClick={closeSidebar}>
              <TbLayoutDashboard size={20} /> Dashboard
            </Link>
          </li>
          <li className={isActive('/statistics') ? 'active' : ''}>
            <Link to="/statistics" onClick={closeSidebar}>
              <BsBarChartLine size={20} /> Statistics
            </Link>
          </li>
          <li className={isActive('/settings') ? 'active' : ''}>
            <Link to="/settings" onClick={closeSidebar}>
              <FiSettings size={20} /> Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
