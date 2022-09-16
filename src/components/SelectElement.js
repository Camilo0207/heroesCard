import React from "react";
import styles from "../styles/SelectElement.module.css"
export default function SelectElement({ item, onChange,onBlur }) {

  return (
    <div className={styles.options}>
      <input
        type={"radio"}
        name={`${item.info}`}
        value={`${item.url}`}
        onChange={onChange}
        onBlur={onBlur}
        
      />
      <img src={`${item.url}`} alt={`${item.info}`} />
    </div>
  );
}
