"use client";

import React from "react";
import styles from "./styles.module.css";

export default function SearchBar({
  isEdit,
  selectedCount,
  searchTerm,
  handleSearch,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {isEdit ? `${selectedCount} Selected` : "Contacts"}
      </div>
      <form>
        <input
          className={styles.input}
          value={searchTerm}
          placeholder="Search contacts"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type="text"
        ></input>
      </form>
    </div>
  );
}
