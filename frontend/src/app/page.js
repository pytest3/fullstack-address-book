import styles from "./page.module.css";
import NameList from "@/components/NameList";
import SearchBar from "@/components/SearchBar/SearchBar";
import NavBarMain from "@/components/NavbarMain";

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <NavBarMain></NavBarMain>
      <SearchBar />
      <NameList />
    </main>
  );
}
