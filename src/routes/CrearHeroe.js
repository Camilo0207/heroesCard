import React, { useState } from "react";
import styles from "../styles/CrearHeroe.module.css";
import imgs from "../data/imagenes.json";
import SelectElement from "../components/SelectElement";
import flecha from "../assets/img/flecha.png";
import { Link, useNavigate } from "react-router-dom";
import { helpValidaciones } from "../helpers/helpValidaciones";

const initialForm = {
  name: "",
  backGround: "",
  img: "",
  info: "",
};

export default function CrearHeroe({ createData }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(initialForm);
  const [activeBg, setActiveBg] = useState(false);
  const [activeImg, setActiveImg] = useState(false);
  const [errors, setErrors] = useState({})
  const { validarNuevoHeroe } = helpValidaciones();
  const {backGround,imgProfile}= imgs


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlerBlur = (e)=>{
    handleChange(e);
    setErrors(validarNuevoHeroe(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validarNuevoHeroe(form)
    setErrors(newErrors)

    if(Object.keys(newErrors).length === 0){
      createData(form);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setForm(initialForm);
        navigate("/home");
      }, 3000);
    }else{
      return
    }

  };

  const handleShow = (e) => {
    if (e.target.id === "background") setActiveBg(!activeBg);
    if (e.target.id === "imgProfile") setActiveImg(!activeImg);
  };

  
  return (
    <div className={styles.mainBox}>
      <div className={styles.navBox}>
        <nav>
          <Link to={"/home"}>Home</Link>
        </nav>
      </div>
      {loading?(
        <p className={styles.loading}>CREANDO NUEVO HEROE...</p>
      ):(
        <div className={styles.formBox}>
        <h2>Crear Heroe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            name={"name"}
            value={form.name}
            onChange={handleChange}
            placeholder={"Nombre"}
            onBlur={handlerBlur}
          />
          {errors && <p className={styles.error}>{errors.name}</p>}

          <div className={styles.escoger} onClick={handleShow} id="background">
            <p id="background">Escoge un fondo</p>
            <img id="background" src={flecha} alt={"Logo flecha"} />
          </div>

          {activeBg && (
            <div className={styles.bgImages}>
              {backGround.map((el) => (
                <SelectElement key={el.id} item={el} onChange={handleChange} onBlur={handlerBlur} />
              ))}
            </div>
          )}
          {errors && <p className={styles.error}>{errors.backGround}</p>}

          <div className={styles.escoger} onClick={handleShow} id="imgProfile">
            <p id="imgProfile">Escoge una imagen de tu personaje</p>
            <img id="imgProfile" src={flecha} alt={"Logo flecha"} />
          </div>

          {activeImg && (
            <div className={styles.bgImages}>
              {imgProfile.map((el) => (
                <SelectElement key={el.id} item={el} onChange={handleChange} onBlur={handlerBlur}/>
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
            onBlur={handlerBlur}
          />
          {errors && <p className={styles.error}>{errors.info}</p>}

          <div className={styles.boxButtons}>
            <input
              className={styles.button}
              type={"submit"}
              value={"CREA TU HEROE"}
              
            />
          </div>
        </form>
      </div>
      )}
      
    </div>
  );
}
