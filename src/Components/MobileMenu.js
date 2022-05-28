import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import icon from "../Assets/Vector.png";
import styles from "../Styles/Menu/MenuMob.module.scss";

function MobileMenu() {
  const [mobMenu, setMobMenu] = useState(false);

  const toggleMenu = () => {
    setMobMenu(!mobMenu);
  };
  return (
    <div>
      <div className={styles.mobile_active}>
        <button
          className={styles.menu_btn}
          onClick={toggleMenu}
          style={!mobMenu ? { display: "block" } : { display: "none" }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div
        className={styles.menu_container}
        style={mobMenu ? { display: "block" } : { display: "none" }}
      >
        <div className={styles.menu}>
          <div className={styles.menu_header}>
            <Link to="/MarketLogic-PT/">
              <img src={logo} alt="logo" />
            </Link>
            <p>Dashboard</p>

            <button onClick={toggleMenu}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className={styles.menu_body}>
            <nav className={styles.menu_body__nav}>
              <ul>
                <li>
                  <img src={icon} alt="icon" />
                  <Link to="Overview">Overview</Link>
                </li>
                <li>
                  <Link to="add">Add ticket</Link>
                </li>
                <li>
                  <Link to="/">LogOut</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
