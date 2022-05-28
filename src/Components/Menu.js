import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import icon from "../Assets/Vector.png";
import styles from "../Styles/Menu/Menu.module.scss"

function Menu() {
  return (
    <div className={styles.menu_container}>
      <div className={styles.menu}>
        <div className={styles.menu_header}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <p>Dashboard</p>
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
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Menu;
