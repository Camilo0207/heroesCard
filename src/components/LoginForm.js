import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LoginForm.module.css";

export default function LoginForm({ errors, onSubmit, onChange, form }) {
  const handleChange = (e) => {
    onChange(e);
  };

  const handleSubmit = (e) => {
    onSubmit(e);
  };
  return (
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
  );
}
