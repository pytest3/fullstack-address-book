import React from "react";
import styles from "./UserProfile.module.css";

export default function UserProfile({ session, children }) {
  return (
    <div className={styles.wrapper}>
      {/* <article className={styles.userInfo}>
        <div className={styles.userAvatar}>ZZ</div>
        <div className={styles.userName}>Zac</div>
        <div className={styles.userEmail}>email@gmail.com</div>
      </article> */}

      <div>{children}</div>
      <div className={styles.userName}>Zac</div>
      <div className={styles.userEmail}>email@gmail.com</div>
      <div>3 contacts</div>
      <div className={styles.logout}>Logout</div>
    </div>
  );
}
