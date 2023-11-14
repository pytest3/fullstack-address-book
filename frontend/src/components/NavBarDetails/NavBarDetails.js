import React from "react";
import NavBarWrapper from "../NavBarWrapper";
import styles from "./NavBarDetails.module.css";
import { ChevronLeft, Pencil } from "lucide-react";
import Link from "next/link";

export default function NavBarDetails() {
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActions}>
        <Link href="/">
          <ChevronLeft className={styles.icon} />
        </Link>
      </div>
      <div className={styles.rightActions}>
        <Pencil className={styles.icon} />
      </div>
    </NavBarWrapper>
  );
}

<Pencil size={40} color="#a93232" strokeWidth={3} />;
