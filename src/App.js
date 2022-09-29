import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import { Login } from "./routes/Login";
import Footer from "./components/Footer";
import CrearCuenta from "./routes/CrearCuenta";
import CrearHeroe from "./routes/CrearHeroe";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/crearCuenta" element={<CrearCuenta />}></Route>
            <Route path="/crearHeroe" element={<CrearHeroe />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
export default App;
