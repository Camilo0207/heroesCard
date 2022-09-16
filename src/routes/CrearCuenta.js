import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/CrearCuenta.module.css";
import { helpValidaciones } from "../helpers/helpValidaciones";
const initialForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  country: "",
};

export default function CrearCuenta({ createData, db }) {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {validarCrearCuenta}=helpValidaciones()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validarCrearCuenta(form, db));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validarCrearCuenta(form, db);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      createData(form);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        handleReset(e);
        navigate("/");
      }, 3000);
    } else {
      return;
    }
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  return (
    <main>
      {loading ? (
        <p className={styles.loading}>CREANDO USUARIO...</p>
      ) : (
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
          <p>¿Ya tenés una cuenta? {<Link to={"/"}>Ingresár</Link>}</p>
        </div>
      )}
    </main>
  );
}
