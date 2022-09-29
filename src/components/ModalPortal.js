import { useContext } from "react";
import ReactDOM from "react-dom";
import ThemeContext from "../context/ThemeContext";
import "../styles/Modal.css";

const ModalPortal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  const { theme } = useContext(ThemeContext);

  return ReactDOM.createPortal(
    <article className={`modal ${isOpen && "is-open"} `} onClick={closeModal}>
      <div
        className={`modal-container ${theme==="dark" && "darkMode"}`}
        onClick={handleModalContainerClick}
      >
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>,
    document.getElementById("modal")
  );
};

export default ModalPortal;
