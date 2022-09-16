import React, { useState } from "react";
import { Link } from "react-router-dom";
import Heroe from "../components/Heroe";
import styles from "../styles/Home.module.css";
import { useModal } from "../hooks/useModal";
import ModalPortal from "../components/ModalPortal";

export default function Home({ db, deleteData }) {
  const [search, setSearch] = useState("");
  const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const encontrarHeroes = !search
    ? db
    : db.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.home}>
      <div className={styles.navBox}>
        <nav>
          <Link to={"/"}>Cerrar sesion</Link>
        </nav>
      </div>

      <p className={styles.search}>
        Buscar Heroe: <input type={"text"} onChange={handleChange} />
      </p>

      <section>
        {db && encontrarHeroes.length > 0 ? (
          encontrarHeroes.map((el) => (
            <Heroe key={el.id} heroe={el} openModalPortal={openModalPortal} deleteData={deleteData}/>
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

      {/* <button onClick={openModalPortal}>Modal en Portal</button> */}
      <ModalPortal isOpen={isOpenPortal} closeModal={closeModalPortal}>
        <div className={styles.modal}>
          <h3>GRACIAS POR USAR LA APP</h3>
        </div>
      </ModalPortal>
    </div>
  );
}
