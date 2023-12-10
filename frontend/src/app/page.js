"use client";

import styles from "./page.module.css";
import NameList from "@/components/NameList";
import SearchBar from "@/components/SearchBar/SearchBar";
import NavBarMain from "@/components/NavbarMain";
import React from "react";

export default function Home() {
  const [isEdit, setIsEdit] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState("");
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const selectedCount = selectedContacts.length;
  const [searchTerm, setSearchTerm] = React.useState("");

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
        toggleEdit={toggleEdit}
        isEdit={isEdit}
        showContactsInNav={showContactsInNav}
        selectedCount={selectedCount}
      ></NavBarMain>
      <SearchBar
        isEdit={isEdit}
        selectedCount={selectedCount}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setShowContactsInNav={setShowContactsInNav}
      />
      <NameList
        isEdit={isEdit}
        toggleEdit={toggleEdit}
        updateSelectedContacts={updateSelectedContacts}
        selectedCount={selectedCount}
        selectedContacts={selectedContacts}
        key={refreshKey}
        toggleRefresh={setRefreshKey}
        searchTerm={searchTerm}
      />
    </main>
  );
}
