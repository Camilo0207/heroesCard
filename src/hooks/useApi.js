import axios from 'axios';
import { useState, useEffect } from 'react';

export const useApi = (url) => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  const api = axios.create();

  useEffect(() => {
    const fetchData = async () => {
      if (!db) {
        try {
          setRequestCount((prevCount) => prevCount + 1); // Incrementa el contador
          const response = await api.get(url);
          
          if (!response.data.err && !db) {
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
  }, [url]);
  

  const createData = (data) => {
    const options = {
      method: "POST",
      data: data,
      headers: { "content-type": "application/json" }
    };

    api.post(url, options)
      .then((res) => {
        if (!res.data.err) {
          setDb((prevData) => [...prevData, res.data]);
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const updateData = (data) => {
    const endpoint = `${url}/${data.id}`;
    const options = {
      data: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options)
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
      const endpoint = `${url}/${id}`;
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

  return {
    db,
    createData,
    updateData,
    deleteData,
  };
};
