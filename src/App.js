import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import { Login } from "./routes/Login";
import Footer from "./components/Footer";
import CrearCuenta from "./routes/CrearCuenta";
import { useApi } from "./hooks/useApi";
import CrearHeroe from "./routes/CrearHeroe";

function App() {
  const urlUsuarios = "http://localhost:5000/usuariosCreados";
  const usuarios = useApi(urlUsuarios);
  const urlHeroes = "http://localhost:5000/heroes";
  const heroes = useApi(urlHeroes);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login db={usuarios.db} />}></Route>
          <Route path="/home" element={<Home db={heroes.db } deleteData={heroes.deleteData}/>}></Route>
          <Route
            path="/crearCuenta"
            element={
              <CrearCuenta createData={usuarios.createData} db={usuarios.db} />
            }
          ></Route>
          <Route path="/crearHeroe" element={<CrearHeroe createData={heroes.createData}/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
