import React from "react";
import styles from "./MainSignInButton.module.css";
export default function MainSignInButton({ ...props }) {
  return (
    <button className={styles.button} {...props}>
      <div className={styles.overlay}></div>
      <div className={styles.contents}>Continue with google</div>
    </button>
  );
}
