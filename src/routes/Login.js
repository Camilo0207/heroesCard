import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import LoginForm from "../components/LoginForm";
import ThemeContext from "../context/ThemeContext";
import {API_URL_USUARIOS} from "../constantes/constants"
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
};

export const Login = () => {
  //const { db } = useApi("http://localhost:5000/usuariosCreados");
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { validarLogin } = helpValidaciones();
  const {theme} = useContext(ThemeContext)
  const [errorDB, setErrorDB] = useState(null)
  const [db, setDb] = useState(null)


  const api = axios.create();

  useEffect(() => {
    let isMounted = true; // Referencia de montaje
    
    const fetchData = async () => {
      if (isMounted && !db ) {
        try {
          const response = await api.get(API_URL_USUARIOS);
          if (!response.data.err && isMounted) {
            setErrorDB(null);
            setDb(response.data);
          } else {
            setErrorDB(response.data);
          }
        } catch (error) {
          setErrorDB(error);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false; // Establecer la referencia de montaje a falso al desmontar
    };
  }, [API_URL_USUARIOS,db]);

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
