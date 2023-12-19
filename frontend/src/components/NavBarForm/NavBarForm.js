import React from "react";
import styles from "./NavBarForm.module.css";
import Link from "next/link";
import NavBarWrapper from "../NavBarWrapper";

export default function NavBarForm({ title = "New Contact" }) {
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActionsWrapper}>
        <Link href="/" className={styles.cancelBtn}>
          Cancel
        </Link>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightActionWrapper}>
        <button className={styles.saveBtn} form="new-user-form">
          Save
        </button>
      </div>
    </NavBarWrapper>
  );
}
