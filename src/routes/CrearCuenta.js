import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/CrearCuenta.module.css";
import { helpValidaciones } from "../helpers/helpValidaciones";
import { useApi } from "../hooks/useApi";
import CrearCuentaForm from "../components/CrearCuentaForm";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import {API_URL_USUARIOS} from "../constantes/constants"
import axios from "axios";
const initialForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  country: "",
};

export default function CrearCuenta() {
  //const { createData, db } = useApi("http://localhost:5000/usuariosCreados");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { validarCrearCuenta } = helpValidaciones();
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext)
  const [db, setDb] = useState(null)
  const [errorDB, setErrorDB] = useState(null)

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

  const createData = (data) => {
    api.post(API_URL_USUARIOS, data)
    .then((res) => {
      if (!res.data.err) {
          setDb((prevData) => [...prevData, res.data]);
        } else {
          setErrorDB(res.data);
        }
      })
      .catch((err) => {
        setErrorDB(err);
      });
  };
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
        navigate("/index.html");
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
