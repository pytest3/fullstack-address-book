import React from "react";
import styles from "./NavBarMain.module.css";
import { Plus, UserCircle } from "lucide-react";
import NavBarWrapper from "../NavBarWrapper";
import Link from "next/link";

export default function NavBarMain({ toggleEdit, isEdit, showContactsInNav }) {
  console.log(showContactsInNav);
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActions} onClick={toggleEdit}>
        {isEdit ? "Done" : "Edit"}
      </div>
      {/* {showContactsInNav ? <div className={styles.header}>Contacts</div> : null} */}
      <div
        className={styles.header}
        style={{
          transform: showContactsInNav ? "translateY(0%)" : "translateY(20%)",
          opacity: showContactsInNav ? 1 : 0,
          transition: showContactsInNav
            ? "opacity 600ms, transform 400ms"
            : "opacity 200ms, transform 400ms",
        }}
      >
        Contacts
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
