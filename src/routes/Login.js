import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { helpValidaciones } from "../helpers/helpValidaciones";

const initialForm = {
  email: "",
  password: "",
};

export const Login = ({db}) => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const {validarLogin}=helpValidaciones()
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validarLogin(form,db);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/home");
    } else {
      return;
    }
  };

  

  return (
    <div className={styles.login}>
      <div className={styles.box}>
        <h2>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={"ejemplo@gmail.com"}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          <input
            type={"password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={"Contraseña"}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <input className={styles.button} type={"submit"} value={"Entrar"} />
        </form>
        <p>
          ¿No tenés una cuenta? {<Link to={"/crearCuenta"}>Registrarme</Link>} 
        </p>
      </div>
    </div>
  );
};
