import React from "react";
import styles from "./styles.module.css";
import { Plus, UserCircle } from "lucide-react";

export default function NavBar() {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.leftActions}>Edit</div>
      <div className={styles.rightActions}>
        <Plus className={styles.icon} />
        <UserCircle className={styles.icon} />
      </div>
    </nav>
  );
}
