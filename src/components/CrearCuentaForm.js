import React from 'react'
import { Link } from "react-router-dom";
import styles from "../styles/CrearCuentaForm.module.css"


export default function CrearCuentaForm({errors,onChange,onSubmit,onBlur,onReset,form}) {

    const handleChange=(e)=>{
        onChange(e)
    }

    const handleSubmit=(e)=>{
        onSubmit(e)
    }

    const handleBlur=(e)=>{
        onBlur(e)
    }

    const handleReset=()=>{
        onReset()
    }
  return (
    <div className={styles.box}>
          <h2>Registro</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name={"name"}
              type={"text"}
              onChange={handleChange}
              placeholder={"Nombre"}
              value={form.name}
              onBlur={handleBlur}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <input
              name={"lastname"}
              type={"text"}
              onChange={handleChange}
              placeholder={"Apellido"}
              value={form.lastname}
              onBlur={handleBlur}
            />
            {errors.lastname && (
              <p className={styles.error}>{errors.lastname}</p>
            )}
  
            <input
              name={"email"}
              type={"email"}
              onChange={handleChange}
              placeholder={"Email"}
              value={form.email}
              onBlur={handleBlur}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <input
              name={"password"}
              type={"text"}
              onChange={handleChange}
              placeholder={"Contraseña"}
              value={form.password}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}

            <select
              name={"country"}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Escoge tu pais...</option>
              <option value="Colombia">Colombia</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Chile">Chile</option>
            </select>
            {errors.country && <p className={styles.error}>{errors.country}</p>}

            <div className={styles.buttons}>
              <input
                className={styles.reset}
                type={"reset"}
                value={"Resetear"}
                onClick={handleReset}
              />
              <input
                className={styles.newUser}
                type={"submit"}
                value={"Siguiente"}
              />
            </div>
          </form>
          <p>¿Ya tenés una cuenta? {<Link to={"/index.html"}>Ingresár</Link>}</p>
        </div>
  )
}
