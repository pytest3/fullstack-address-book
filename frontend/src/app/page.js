import Image from "next/image";
import styles from "./page.module.css";
import ContactList from "@/components/ContactList/ContactList";
import NameList from "@/components/NameList";
import NavBar from "@/components/NavBar/NavBar";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {
  return (
    <main className={styles.wrapper}>
      {/* <ContactList /> */}
      <NavBar />
      <SearchBar />
      <NameList />
    </main>
  );
}
