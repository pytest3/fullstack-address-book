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
        <div className={styles.innerUserNameWrapper}>
          <span>{user.firstName}</span> <span>{user.lastName}</span>
        </div>
      </div>
      {/* <div className={styles.userEmail}>
        <div className={styles.innerUserEmailWrapper}>
          <div>{user.email}</div>
        </div>
      </div> */}
      <div className={styles.userContacts}>
        <div className={styles.innerUserContactsWrapper}>
          <div>3 contacts</div>
        </div>
      </div>

      <div className={styles.logout} onClick={signOut}>
        <div className={styles.innerLogoutWrapper}>Logout</div>
      </div>
    </div>
  );
}
