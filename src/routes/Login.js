import React, { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import LoginForm from "../components/LoginForm";
import ThemeContext from "../context/ThemeContext";

const initialForm = {
  email: "",
  password: "",
};

export const Login = () => {
  const { db } = useApi("http://localhost:5000/usuariosCreados");
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { validarLogin } = helpValidaciones();
  const {theme} = useContext(ThemeContext)


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validarLogin(form, db);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/home");
    } else {
      return;
    }
  };

  return (
    <div className={`${styles.login} ${theme==="dark" && "darkMode"}`}>
      <LoginForm
        errors={errors}
        onSubmit={handleSubmit}
        onChange={handleChange}
        form={form}
      />
    </div>
  );
};
