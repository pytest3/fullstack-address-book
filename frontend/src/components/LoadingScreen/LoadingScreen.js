import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.spinner} src="/spinner.svg" />
    </div>
  );
}
