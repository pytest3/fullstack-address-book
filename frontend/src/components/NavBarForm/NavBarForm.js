import React from "react";
import styles from "./NavBarForm.module.css";
import Link from "next/link";
import NavBarWrapper from "../NavBarWrapper";

import { Check, X } from "lucide-react";

export default function NavBarForm({ title = "New Contact" }) {
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActionsWrapper}>
        <Link href="/" className={styles.cancelBtn}>
          <X />
        </Link>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightActionWrapper}>
        <button className={styles.saveBtn} form="new-user-form">
          <Check></Check>
        </button>
      </div>
    </NavBarWrapper>
  );
}
