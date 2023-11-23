import React from "react";
import NavBarWrapper from "../NavBarWrapper";
import styles from "./NavBarDetails.module.css";
import { ChevronLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NavBarDetails() {
  const { id } = useParams();
  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActions}>
        <Link href="/">
          <ChevronLeft className={styles.icon} />
        </Link>
      </div>
      <div className={styles.rightActions}>
        <Link href={`/edit-contact/${id}`}>
          <Pencil className={styles.icon} />
        </Link>
      </div>
    </NavBarWrapper>
  );
}
