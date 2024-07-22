import React, { useContext } from "react";
// import { Link } from 'react-router-dom'
import styles from "../styles/Header.module.css";
import moon from "../assets/img/moon.png"
import sun from "../assets/img/sun.png"
import ThemeContext from "../context/ThemeContext";

export default function Header() {
  const {theme,handleTheme} = useContext(ThemeContext)
  return (
    <div>
      <div className={`${styles.headerParrafo} ${theme==="dark" && "darkMode"}`}>
        <p>20% de descuento en todos los productos!</p>
      </div>
      <div className={`${styles.headerLogo} ${theme==="dark" && "darkMode"}`}>
        <div className={styles.contenedor}>
        <img src={"https://imgs-herores.s3.amazonaws.com/logo.png"} alt={"Logo"} />
        <p>NOMBRE TIENDA</p>
        </div>
        <div className={`${styles.darkOptions} ${theme==="dark" && styles.darkModeButton}`} >
          {theme==="light"
            ?<img onClick={handleTheme} id={"light"} src={moon} alt="imagen de una luna" />
            :<img onClick={handleTheme} id={"dark"} src={sun} alt="imagen de un sol" />
          }
        </div>
      </div>
    </div>
  );
}
