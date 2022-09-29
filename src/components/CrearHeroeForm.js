import React, { useContext, useEffect, useState } from "react";
import SelectElement from "./SelectElement";
import imgs from "../data/imagenes.json";
import styles from "../styles/CrearHeroeForm.module.css";
import flecha from "../assets/img/flecha.png";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import ThemeContext from '../context/ThemeContext';

const initialForm = {
  name: "",
  backGround: "",
  img: "",
  info: "",
};

export default function CrearHeroeForm({
  setLoading,
  config,
  heroe,
  updateData,
  closeModalPortal,
}) {
  const { backGround, imgProfile } = imgs;
  const [activeBg, setActiveBg] = useState(false);
  const [activeImg, setActiveImg] = useState(false);
  const { validarNuevoHeroe } = helpValidaciones();
  const { createData } = useApi("http://localhost:5000/heroes");
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    if (config) {
      setForm({
        id: heroe.id,
        name: heroe.name,
        backGround: heroe.backGround,
        img: heroe.img,
        info: heroe.info,
      });
    }
  }, [config]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validarNuevoHeroe(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validarNuevoHeroe(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (config) {
        updateData(form);
        closeModalPortal();
      } else {
        createData(form);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setForm(initialForm);
          navigate("/home");
        }, 3000);
      }
    } else {
      return;
    }
  };

  const handleShow = (e) => {
    if (e.target.id === "background") setActiveBg(!activeBg);
    if (e.target.id === "imgProfile") setActiveImg(!activeImg);
  };
  return (
    <div className={styles.formBox}>
      {config ? <h2>Configurar heroe</h2> : <h2>Crear Heroe</h2>}
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          name={"name"}
          value={form.name}
          onChange={handleChange}
          placeholder={"Nombre"}
          onBlur={handleBlur}
        />
        {errors && <p className={styles.error}>{errors.name}</p>}

        <div className={`${styles.escoger} ${theme==="dark" && styles.darkMode}`} onClick={handleShow} id="background">
          <p id="background">Escoge un fondo</p>
          <img id="background" src={flecha} alt={"Logo flecha"} />
        </div>

        {activeBg && (
          <div className={styles.bgImages}>
            {backGround.map((el) => (
              <SelectElement
                key={el.id}
                item={el}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
        )}
        {errors && <p className={styles.error}>{errors.backGround}</p>}

        <div className={`${styles.escoger} ${theme==="dark" && styles.darkMode}`} onClick={handleShow} id="imgProfile">
          <p id="imgProfile">Escoge una imagen de tu personaje</p>
          <img id="imgProfile" src={flecha} alt={"Logo flecha"} />
        </div>

        {activeImg && (
          <div className={styles.bgImages}>
            {imgProfile.map((el) => (
              <SelectElement
                key={el.id}
                item={el}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
        )}
        {errors && <p className={styles.error}>{errors.img}</p>}

        <h3>Describe tu heroe</h3>
        <textarea
          name={"info"}
          rows="10"
          cols="50"
          onChange={handleChange}
          value={form.info}
          placeholder={"Añade la descripcion..."}
          onBlur={handleBlur}
        />
        {errors && <p className={styles.error}>{errors.info}</p>}

        <div className={styles.boxButtons}>
          <input
            className={styles.button}
            type={"submit"}
            value={config ? "Configurar Heroe" : "Crear Heroe"}
          />
        </div>
      </form>
    </div>
  );
}
