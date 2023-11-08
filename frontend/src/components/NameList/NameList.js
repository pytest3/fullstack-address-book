import React from "react";
import styles from "./styles.module.css";
import { UserCircle2 } from "lucide-react";

export default function NameList() {
  const names = ["Thomas cook", "Lily Tan", "Claudia Foo", "Alicia Keys"];
  return (
    <div>
      {names.map((name) => {
        return (
          <article className={styles.card}>
            <UserCircle2 className={styles.avatar} />
            <div className={styles.name}>{name}</div>
            <div className={styles.job}>{name}</div>
          </article>
        );
      })}
    </div>
  );
}
