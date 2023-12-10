import React from "react";
import styles from "./NavBarMain.module.css";
import { Plus, UserCircle } from "lucide-react";
import NavBarWrapper from "../NavBarWrapper";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function NavBarMain({
  toggleEdit,
  isEdit,
  showContactsInNav,
  selectedCount,
}) {
  const [vibrate, setVibrate] = React.useState(false);

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
        <button
          form="edit-form"
          onClick={(e) => {
            if (selectedCount === 0) {
              e.preventDefault();
              setVibrate(true);
              setTimeout(() => {
                setVibrate(false);
              }, 550);
            }
          }}
          className={`${styles.trashIcon} ${vibrate && styles.vibrate}`}
        >
          <Trash2
            style={{
              opacity: isEdit ? 1 : 0,
              color: selectedCount > 0 ? "#bc4749" : "var(--color-gray-3)",
              transition: "opacity 700ms",
            }}
          ></Trash2>
        </button>

        <Link href="/new-contact">
          <Plus className={styles.icon} />
        </Link>
        <UserCircle className={styles.icon} />
      </div>
    </NavBarWrapper>
  );
}
