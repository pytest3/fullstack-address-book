"use client";

import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  isEdit,
  selectedCount,
  searchTerm,
  handleSearch,
  setShowContactsInNav,
}) {
  function intersectionCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // if more than 0.92 of contacts search bar is visible in viewport
        setShowContactsInNav(false);
      } else {
        // if less than 0.92 of contacts search bar is visible in viewport
        setShowContactsInNav(true);
      }
    });
  }

  let options = {
    root: null,
    threshold: 0.92,
  };

  React.useEffect(() => {
    const target = document.querySelector(`.${styles.searchBarWrapper}`);
    let observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);

  return (
    <div className={styles.searchBarWrapper}>
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
