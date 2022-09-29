import React, { useContext, useState } from "react";
import styles from "../styles/CrearCuenta.module.css";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import CrearCuentaForm from "../components/CrearCuentaForm";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const initialForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  country: "",
};

export default function CrearCuenta() {
  const { createData, db } = useApi("http://localhost:5000/usuariosCreados");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { validarCrearCuenta } = helpValidaciones();
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext)

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
    <main className={`${theme==="dark" && "darkMode"}`}>
      {loading ? (
        <p className={styles.loading}>CREANDO USUARIO...</p>
      ) : (
        <CrearCuentaForm
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBlur={handleBlur}
          onReset={handleReset}
          form={form}
        />
      )}
    </main>
  );
}
