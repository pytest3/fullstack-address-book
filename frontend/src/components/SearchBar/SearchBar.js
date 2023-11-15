"use client";

import React from "react";
import styles from "./styles.module.css";

export default function SearchBar({ isEdit, selectedCount }) {
  const [search, setSearch] = React.useState("");
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {isEdit ? `${selectedCount} Selected` : "Contacts"}
      </div>
      <form>
        <input
          className={styles.input}
          value={search}
          placeholder="Search contacts"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
        ></input>
      </form>
    </div>
  );
}
