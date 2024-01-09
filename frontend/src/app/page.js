"use client";

import styles from "./page.module.css";
import NameList from "@/components/NameList";
import SearchBar from "@/components/SearchBar/SearchBar";
import NavBarMain from "@/components/NavbarMain";
import React from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isEdit, setIsEdit] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState("");
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const selectedCount = selectedContacts.length;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [contactCount, setContactCount] = React.useState("");
  const { data: session, status } = useSession({
    required: true,
  });
  const [showContactsInNav, setShowContactsInNav] = React.useState(false);

  const toggleEdit = React.useCallback(() => {
    setIsEdit((currentEditingStatus) => !currentEditingStatus);
    setSelectedContacts([]);
  }, []);

  const updateSelectedContacts = React.useCallback(
    (e) => {
      let nextSelectedContacts;
      const isChecked = selectedContacts.includes(+e.target.name);
      if (isChecked) {
        nextSelectedContacts = selectedContacts.filter(
          (i) => i != +e.target.name
        );
        setSelectedContacts(nextSelectedContacts);
        return;
      }
      nextSelectedContacts = [...selectedContacts, +e.target.name];
      setSelectedContacts(nextSelectedContacts);
    },
    [selectedContacts]
  );

  const handleSearch = React.useCallback((userInput) => {
    setSearchTerm(userInput);
  }, []);

  // if (process.env.NODE_ENV === "production") {
  //   if (status != "authenticated" || !session || !status) {
  //     return <LoadingScreen />;
  //   }
  // }

  if (status != "authenticated" || !session || !status) {
    return <LoadingScreen />;
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
        contactCount={contactCount}
        session={session}
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
        setContactCount={setContactCount}
      />
    </main>
  );
}
