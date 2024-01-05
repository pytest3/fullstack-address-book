import React from "react";
import styles from "./ErrorMessageWrapper.module.css";
import Link from "next/link";

export default function ErrorMessageWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
      <Link href="/">Return home</Link>
    </div>
  );
}
