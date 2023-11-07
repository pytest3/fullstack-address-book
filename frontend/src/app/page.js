import Image from "next/image";
import styles from "./page.module.css";
import ContactList from "@/components/ContactList/ContactList";

export default function Home() {
  return (
    <main className={styles.main}>
      <ContactList />
    </main>
  );
}
