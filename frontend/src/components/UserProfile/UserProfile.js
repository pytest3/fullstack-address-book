import React from "react";
import styles from "./UserProfile.module.css";
import { signOut } from "next-auth/react";

export default function UserProfile({ user, children }) {
  return (
    <div className={styles.wrapper}>
      {/* <article className={styles.userInfo}>
        <div className={styles.userAvatar}>ZZ</div>
        <div className={styles.userName}>Bruce</div>
        <div className={styles.userEmail}>email@gmail.com</div>
      </article> */}

      <div>{children}</div>
      <div className={styles.userName}>
        {user.firstName} {user.lastName}
      </div>
      <div className={styles.userEmail}>{user.email}</div>
      <div>3 contacts</div>
      <div className={styles.logout} onClick={signOut}>
        Logout
      </div>
    </div>
  );
}
