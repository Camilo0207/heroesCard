import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import styles from "../styles/Footer.module.css"
export default function Footer() {
  const {theme} = useContext(ThemeContext)

  return (
    // <div className={"darkMode"}>
    <div className={`${styles.footer} ${theme==="dark" && "darkMode"}`}>
        <p>Todos los derechos reservados a FRONT END 1</p>
    </div>
  )
}
