import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heroe from "../components/Heroe";
import styles from "../styles/Home.module.css";
import { useApi } from "../hooks/useApi";
import ThemeContext from "../context/ThemeContext";
import axios from "axios";
import { API_URL } from "../constantes/constants";

export default function Home() {
  //const { db, deleteData,updateData } = useApi(API_URL)
  const [search, setSearch] = useState();
  const {theme} = useContext(ThemeContext)
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);

  const api = axios.create();
  
  
  useEffect(() => {
    let isMounted = true; // Referencia de montaje
    const fetchData = async () => {
      if (isMounted && !db ) {
        try {
          const response = await api.get(API_URL);
          if (!response.data.err && isMounted) {
            setError(null);
            setDb(response.data);
          } else {
            setError(response.data);
          }
        } catch (error) {
          setError(error);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false; // Establecer la referencia de montaje a falso al desmontar
    };
  }, [API_URL,db]);

  const updateData = (data) => {
    const endpoint = `${API_URL}/${data.id}`;

    api.put(endpoint, data)
      .then((res) => {
        if (!res.data.err) {
          setDb((prevData) => prevData.map((el) => (el.id === data.id ? data : el)));
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const deleteData = (id) => {
    const isDelete = window.confirm(`¿Estás seguro de eliminar este elemento?`);

    if (isDelete) {
      const endpoint = `${API_URL}/${id}`;
      const options = {
        headers: { "content-type": "application/json" },
      };

      api.delete(endpoint, options)
        .then((res) => {
          if (!res.data.err) {
            setDb((prevData) => prevData.filter((el) => el.id !== id));
          } else {
            setError(res.data);
          }
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      return;
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const encontrarHeroes = !search
    ? db
    : db.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`${styles.home} ${theme==="dark" && "darkMode"}`}>
      
      <div className={`${styles.navBox} ${theme==="dark" && "darkMode"}`}>
        <nav className={`${theme==="dark" && "darkMode"}`}>
          <Link to={"/index.html"}>Cerrar sesion</Link>
        </nav>
      </div>

      <p className={styles.search}>
        Buscar Heroe: <input type={"text"}  onChange={handleChange}/>
      </p>

      <section>
        {db && encontrarHeroes.length > 0 ? (
          encontrarHeroes.map((el) => (
            <Heroe key={el.id} heroe={el}  deleteData={deleteData} updateData={updateData}/>
          ))
        ) : (
          <p
            className={styles.notFound}
          >{`No hay resultados para tu busqueda ('${search}')`}</p>
        )}
      </section>
      <Link to={"/crearHeroe"} className={styles.crear}>
        +
      </Link>
    </div>
  );
}
