import React from "react";
import styles from "./UserProfile.module.css";
import { signOut } from "next-auth/react";

export default function UserProfile({ user, children, contactCount }) {
  return (
    <div className={styles.wrapper}>
      {/* hi*/}
      <div>{children}</div>
      <div className={styles.userName}>
        <div className={styles.innerUserNameWrapper}>
          <span>{user.firstName}</span> <span>{user.lastName}</span>
        </div>
      </div>
      <div className={styles.userContacts}>
        <div className={styles.innerUserContactsWrapper}>
          <div>{contactCount} contacts</div>
        </div>
      </div>

      <div className={styles.logout} onClick={signOut}>
        <div className={styles.innerLogoutWrapper}>Logout</div>
      </div>
    </div>
  );
}
