import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  // 👇 NEW state for mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setLang(i18n.language);
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Ijisho</h2>
      </div>

      {/* 👇 Burger Icon */}
      <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen && (
          <div className="custom-burger-icon">
            <span></span>
            <span></span>
          </div>
        )}
        {menuOpen && '✕'}
      </div>


      {/* 👇 Mobile Menu (nav-links + language switcher) */}
      <ul className={`nav-links ${menuOpen ? 'mobile-menu' : ''}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>{t("home")}</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>{t("about")}</Link>
        </li>
        {/* 👇 Add language switcher inside burger dropdown */}
        <li className="mobile-lang">
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="lang-select"
          >
            <option value="rw">🇷🇼 Kinyarwanda</option>
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </li>
      </ul>

      {/* 👇 Desktop language switcher (still visible on large screens) */}
      <div className="language-switcher desktop-lang">
        <select
          value={lang}
          onChange={(e) => changeLanguage(e.target.value)}
          className="lang-select"
        >
          <option value="rw">🇷🇼 Kinyarwanda</option>
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>
    </nav>

  );
};

export default Navbar;
