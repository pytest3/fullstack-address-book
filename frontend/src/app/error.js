"use client"; // Error components must be Client Components

import Link from "next/link";
import styles from "./error.module.css";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h2>Something went wrong!</h2>
      <Link href={"/"} className={styles.backBtn}>
        <button>Back to homepage</button>
      </Link>
    </div>
  );
}
