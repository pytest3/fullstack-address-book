import React from "react";
import styles from "./InitialsAvatarEdit.module.css";
import { User2 } from "lucide-react";
import { NameContext } from "../NameProvider/NameProvider";

export default function InitialsAvatarEdit({
  className = "",
  fontSize,
  circleSize,
  fontClassName = "",
}) {
  const {
    name: { firstName, lastName },
  } = React.useContext(NameContext);
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
          <span className={`${styles.initial} ${fontClassName}`}>
            {firstNameInitial}
          </span>
          <span className={`${styles.initial} ${fontClassName}`}>
            {lastNameInitial}
          </span>
        </>
      )}
    </div>
  );
}
