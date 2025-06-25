import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import useWindowWidth from './useWindowWidth'; // adjust path if needed

const Navbar = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [showDashboardPopup, setShowDashboardPopup] = useState(false);

  const width = useWindowWidth();
  const isMobile = width <= 768;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => setLang(i18n.language));
  };
  const toggleDashboardPopup = () => {
    setShowDashboardPopup(!showDashboardPopup);
  };


  return (
    <>
      <nav className="navbar">
        <div className="logo"><h2>Ijisho</h2></div>

        <button className="dashboard-btn" onClick={toggleDashboardPopup}>Dashboards</button>

        <li className="mobile-lang">
          <select value={lang} onChange={(e) => changeLanguage(e.target.value)} className="lang-select">
            <option value="rw">🇷🇼 {isMobile ? 'RW' : 'Kinyarwanda'}</option>
            <option value="en">🇬🇧 {isMobile ? 'GB' : 'English'}</option>
            <option value="fr">🇫🇷 {isMobile ? 'FR' : 'Français'}</option>
          </select>
        </li>

        <div className="language-switcher desktop-lang">
          <select value={lang} onChange={(e) => changeLanguage(e.target.value)} className="lang-select">
            <option value="rw">🇷🇼 {isMobile ? 'RW' : 'Kinyarwanda'}</option>
            <option value="en">🇬🇧 {isMobile ? 'GB' : 'English'}</option>
            <option value="fr">🇫🇷 {isMobile ? 'FR' : 'Français'}</option>
          </select>
        </div>
      </nav>

      {/* POPUP */}
      {showDashboardPopup && (
        <div className="dashboard-popup">
          <div className="popup-content">
            <h3>Select Dashboard</h3>
            <a
              href="https://ijisho-branches.onrender.com"
              className="popup-link"

              rel="noopener noreferrer"
              onClick={() => setShowDashboardPopup(false)}
            >
              Branches
            </a>

            <a
              href="https://ijisho-dashboard.onrender.com"
              className="popup-link"
  
              rel="noopener noreferrer"
              onClick={() => setShowDashboardPopup(false)}
            >
             Main Branches
            </a>

            <button className="close-btn" onClick={() => setShowDashboardPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
