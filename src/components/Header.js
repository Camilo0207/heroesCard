import React from "react";
// import { Link } from 'react-router-dom'
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerParrafo}>
        <p>20% de descuento en todos los productos!</p>
      </div>
      <div className={styles.headerLogo}>
        <img src={"https://i.imgur.com/L1X40JD.png"} alt={"Logo"} />
        <p>NOMBRE TIENDA</p>
      </div>
    </div>
  );
}
