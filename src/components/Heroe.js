import React from "react";
import styles from "../styles/Heroe.module.css";

export default function Heroe({ heroe, openModalPortal, deleteData }) {
  return (
    <article>
      <img
        className={styles.fondoHeroe}
        src={heroe.backGround}
        alt={`Imagen de ${heroe.name}`}
      />
      <div className={styles.logoCorazon}>
        <img src="https://i.imgur.com/0WaUqwo.png" alt="Logo de un corazon" />
        <img
          className={styles.delete}
          onClick={() => deleteData(heroe.id)}
          src="https://i.imgur.com/9niMmHZ.png"
          alt="Logo de imagen para cerrar"
        />
      </div>

      <img
        className={styles.logoHeroe}
        src={heroe.img}
        alt={`Imagen de ${heroe.name}`}
      />
      <h2>{heroe.name.toUpperCase()}</h2>
      <p>{heroe.info}</p>
      <button onClick={() => openModalPortal()}>Ver mas</button>
    </article>
  );
}
