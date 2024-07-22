import React, { useContext, useState } from "react";
import styles from "../styles/CrearHeroe.module.css";
import { Link } from "react-router-dom";
import CrearHeroeForm from "../components/CrearHeroeForm";
import ThemeContext from "../context/ThemeContext";

export default function CrearHeroe() {
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.mainBox} ${theme === "dark" && "darkMode"}`}>
      <div className={`${styles.navBox} ${theme === "dark" && "darkMode"}`}>
        <nav>
          <Link to={"/home"}>Home</Link>
        </nav>
      </div>
      {loading ? (
        <p className={styles.loading}>CREANDO NUEVO HEROE...</p>
      ) : (
        <CrearHeroeForm setLoading={setLoading} />
      )}
    </div>
  );
}
