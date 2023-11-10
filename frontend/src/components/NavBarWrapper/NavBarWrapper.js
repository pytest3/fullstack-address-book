import React from "react";
import styles from "./NavBarWrapper.module.css";

export default function NavBarWrapper({ className, ...props }) {
  return <nav {...props} className={`${className} ${styles.wrapper}`}></nav>;
}
