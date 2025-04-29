import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';
import menu from '../assets/menu.png';
import { TbLayoutDashboard } from 'react-icons/tb';
import { BsBarChartLine } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { RiLogoutBoxRLine } from 'react-icons/ri';



const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const navItemStyle = ({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link';

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        if (isMobile) setIsOpen(false);
    };

    // Watch window resize to update isMobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Hamburger button for mobile only */}
            {isMobile && !isOpen && (
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <img src={menu} alt="" />
                </button>
            )}

            <div className={`sidebar ${isMobile ? (isOpen ? 'open' : '') : 'desktop'}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Dashboard</h2>
                    {/* Close button for mobile only when sidebar is open */}
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

                    <NavLink to="/settings" className={navItemStyle} onClick={closeSidebar}>
                        <FiSettings size={20} /> Settings
                    </NavLink>

                    <NavLink to="/logout" className={navItemStyle} onClick={closeSidebar}>
                        <RiLogoutBoxRLine size={20} /> Logout
                    </NavLink>


                </nav>
            </div>
        </>
    );
};

export default Sidebar;
