"use client";

import styles from "./page.module.css";
import NameList from "@/components/NameList";
import SearchBar from "@/components/SearchBar/SearchBar";
import NavBarMain from "@/components/NavbarMain";
import React from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [isEdit, setIsEdit] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState("");
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const selectedCount = selectedContacts.length;
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data: session } = useSession({ required: true });

  function toggleEdit() {
    setIsEdit(!isEdit);
    setSelectedContacts([]);
  }

  const [showContactsInNav, setShowContactsInNav] = React.useState(false);

  function updateSelectedContacts(e) {
    let nextSelectedContacts;
    if (!e.target) {
      // to reset selected contacts as part of client side re-render
      setSelectedContacts([]);
      return;
    }
    const isPresent = selectedContacts.includes(+e.target.name);
    if (isPresent) {
      nextSelectedContacts = selectedContacts.filter(
        (i) => i != +e.target.name
      );
      setSelectedContacts(nextSelectedContacts);
      return;
    }
    nextSelectedContacts = [...selectedContacts, +e.target.name];
    setSelectedContacts(nextSelectedContacts);
  }

  function handleSearch(userInput) {
    setSearchTerm(userInput);
  }

  return (
    <main className={styles.wrapper}>
      <NavBarMain
        isEdit={isEdit}
        toggleEdit={toggleEdit}
        toggleRefresh={setRefreshKey}
        showContactsInNav={showContactsInNav}
        selectedCount={selectedCount}
        selectedContacts={selectedContacts}
        updateSelectedContacts={updateSelectedContacts}
      ></NavBarMain>
      <SearchBar
        isEdit={isEdit}
        selectedCount={selectedCount}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setShowContactsInNav={setShowContactsInNav}
      />
      <NameList
        key={refreshKey}
        isEdit={isEdit}
        updateSelectedContacts={updateSelectedContacts}
        selectedContacts={selectedContacts}
        searchTerm={searchTerm}
      />
    </main>
  );
}
