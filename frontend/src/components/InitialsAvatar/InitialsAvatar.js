import React from "react";
import styles from "./InitialsAvatar.module.css";
import { User2 } from "lucide-react";

export default function InitialsAvatar({
  firstName,
  lastName,
  className = "",
  fontSize,
  circleSize,
}) {
  const firstNameInitial = firstName.slice(0, 1).toUpperCase();
  const lastNameInitial = lastName.slice(0, 1).toUpperCase();
  return (
    <div
      className={`${styles.avatar} ${className}`}
      style={{ "--size": circleSize, "--fontSize": fontSize }}
    >
      {firstName === "" && lastName === "" ? (
        <User2 size={64} strokeWidth={1.5} />
      ) : (
        <>
          <span className={styles.initial}>{firstNameInitial}</span>
          <span className={styles.initial}>{lastNameInitial}</span>
        </>
      )}
    </div>
  );
}
