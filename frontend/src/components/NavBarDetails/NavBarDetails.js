import React from "react";
import NavBarWrapper from "../NavBarWrapper";
import styles from "./NavBarDetails.module.css";
import { ChevronLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils";
export default function NavBarDetails({ name, showNameInNav, opacity }) {
  const { first_name, last_name } = name;
  const { id } = useParams();

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftActions}>
        <Link href="/">
          <ChevronLeft className={styles.icon} />
        </Link>
      </div>
      <div
        className={styles.navName}
        style={{
          transform: showNameInNav ? "translateY(0%)" : "translateY(100%)",
          opacity: showNameInNav ? 1 : 0,
          transition: showNameInNav
            ? "opacity 800ms 100ms, transform 500ms"
            : "opacity 200ms, transform 500ms",
        }}
      >
        {capitalizeFirstLetter(first_name)} {capitalizeFirstLetter(last_name)}
      </div>
      <div className={styles.rightActions}>
        <Link href={`/edit-contact/${id}`}>
          <Pencil className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
