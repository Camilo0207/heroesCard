import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Heroe.module.css";

import { useModal } from "../hooks/useModal";
import ModalPortal from "../components/ModalPortal";
import CrearHeroeForm from "./CrearHeroeForm";
import ThemeContext from "../context/ThemeContext";

export default function Heroe({heroe,/*openModalPortal,*/ deleteData,updateData,}) {
  const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false);
  const [config, setConfig] = useState(false);
  const {theme} = useContext(ThemeContext)


  const disableScroll = () => {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = () => window.scrollTo(x, y);
  };

  const enableScroll = () => {
    window.onscroll = null;
  };

  useEffect(() => {
    isOpenPortal ? disableScroll() : enableScroll();
  }, [isOpenPortal]);

  const configurar = () => {
    setConfig(true);
    openModalPortal();
  };
  return (
    <article className={`${theme==="dark" && "darkMode"}`}>
      <img
        className={styles.fondoHeroe}
        src={heroe.backGround}
        alt={`Imagen de ${heroe.name}`}
      />
      <div className={styles.logoCorazon}>
        <img src="https://imgs-herores.s3.amazonaws.com/corazon.png" alt="Logo de un corazon" />
        <img
          className={styles.delete}
          onClick={() => deleteData(heroe.id)}
          src="https://imgs-herores.s3.amazonaws.com/equis-roja.png"
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
      <button onClick={configurar}>Configurar</button>

      <ModalPortal isOpen={isOpenPortal} closeModal={closeModalPortal}>
        <div className={styles.modal}>
          <CrearHeroeForm
            config={config}
            heroe={heroe}
            updateData={updateData}
            closeModalPortal={closeModalPortal}
          />
        </div>
      </ModalPortal>
    </article>
  );
}
