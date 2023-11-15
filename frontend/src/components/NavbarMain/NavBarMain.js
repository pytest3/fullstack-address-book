import React from "react";
import styles from "./NavBarMain.module.css";
import { Plus, UserCircle } from "lucide-react";
import NavBarWrapper from "../NavBarWrapper";
import Link from "next/link";

export default function NavBarMain({ toggleEdit, isEdit }) {
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActions} onClick={toggleEdit}>
        {isEdit ? "Done" : "Edit"}
      </div>
      <div className={styles.rightActions}>
        <Link href="/new-contact">
          <Plus className={styles.icon} />
        </Link>
        <UserCircle className={styles.icon} />
      </div>
    </NavBarWrapper>
  );
}
