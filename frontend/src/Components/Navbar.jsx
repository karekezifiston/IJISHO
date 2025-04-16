// src/Components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

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
      <ul className="nav-links">
        <li>
          <Link to="/">{t("home")}</Link>
        </li>
        <li>
          <Link to="/about">{t("about")}</Link>
        </li>
      </ul>
      <div className="language-switcher">
        <select
          value={lang}
          onChange={(e) => changeLanguage(e.target.value)}
          className="lang-select"
        >
          <option value="rw">🇷🇼 Kinyarwanda</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
