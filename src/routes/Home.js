import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Heroe from "../components/Heroe";
import styles from "../styles/Home.module.css";
import { useApi } from "../hooks/useApi";
import ThemeContext from "../context/ThemeContext";

export default function Home() {
  const { db, deleteData,updateData } = useApi("http://localhost:5000/heroes")
  const [search, setSearch] = useState("");
  const {theme} = useContext(ThemeContext)

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const encontrarHeroes = !search
    ? db
    : db.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`${styles.home} ${theme==="dark" && "darkMode"}`}>
      <div className={`${styles.navBox} ${theme==="dark" && "darkMode"}`}>
        <nav className={`${theme==="dark" && "darkMode"}`}>
          <Link to={"/"}>Cerrar sesion</Link>
        </nav>
      </div>

      <p className={styles.search}>
        Buscar Heroe: <input type={"text"} onChange={handleChange} />
      </p>

      <section>
        {db && encontrarHeroes.length > 0 ? (
          encontrarHeroes.map((el) => (
            <Heroe key={el.id} heroe={el}  deleteData={deleteData} updateData={updateData}/>
          ))
        ) : (
          <p
            className={styles.notFound}
          >{`No hay resultados para tu busqueda ('${search}')`}</p>
        )}
      </section>
      <Link to={"/crearHeroe"} className={styles.crear}>
        +
      </Link>
    </div>
  );
}
