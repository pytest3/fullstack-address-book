import React from "react";
import styles from "./NavBarForm.module.css";
import Link from "next/link";
import NavBarWrapper from "../NavBarWrapper";

export default function NavBarForm() {
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActionsWrapper}>
        <Link href="/" className={styles.cancelBtn}>
          Cancel
        </Link>
      </div>
      <div className={styles.title}>New contact</div>
      <div className={styles.rightActionWrapper}>
        <button className={styles.saveBtn}>Save</button>
      </div>
    </NavBarWrapper>
  );
}
