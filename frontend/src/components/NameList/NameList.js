"use client";

import React from "react";
import styles from "./NameList.module.css";
import { Trash2 } from "lucide-react";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";
import Link from "next/link";
import { useHttp } from "@/hooks/useHttp";

export default function NameList({
  isEdit,
  toggleEdit,
  updateSelectedContacts,
  selectedContacts,
  selectedCount,
  toggleRefresh,
  searchTerm = "",
}) {
  async function fetcher(...args) {
    const res = await fetch(...args, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data");
      error.status = res.status;
      throw error;
    }

    return res.json();
  }

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/contacts",
    fetcher
  );

  const filteredContacts = data?.filter(
    (contact) =>
      contact.first_name.includes(searchTerm) ||
      contact.last_name.includes(searchTerm)
  );

  const { sendRequest, response } = useHttp(
    "http://localhost:3000/api/contacts"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await sendRequest("DELETE", selectedContacts);
    toggleRefresh(crypto.randomUUID()); // to force client side re-render on form submit
    updateSelectedContacts([]); // to reset selected contacts as part of client side re-render
    toggleEdit(!isEdit);
  }

  if (filteredContacts.length === 0) {
    return <div className={styles.noContacts}>No contacts found</div>;
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      {filteredContacts?.map(({ id, first_name, last_name }) => {
        return (
          <div key={id} className={styles.row}>
            {isEdit && (
              <div className={styles.checkBox}>
                <input
                  name={id}
                  type="checkbox"
                  className={styles.radio}
                  onChange={(e) => updateSelectedContacts(e)}
                ></input>
              </div>
            )}
            <Link href={`./contact-details/${id}`} className={styles.link}>
              <article key={id} className={styles.card}>
                <InitialsAvatar
                  firstName={first_name}
                  lastName={last_name}
                  className={styles.initialsAvatar}
                  fontSize="20px"
                  circleSize="52px"
                />
                <div className={styles.name}>{first_name}</div>
                <div className={styles.job}>{last_name}</div>
              </article>
            </Link>
          </div>
        );
      })}
      {isEdit && (
        <button disabled={selectedCount === 0} className={styles.footer}>
          <Trash2></Trash2>
          <span>
            Delete
            {selectedCount > 1 ? (
              <>
                <strong> {selectedCount}</strong> contacts
              </>
            ) : selectedCount === 1 ? (
              <>
                <strong> {selectedCount}</strong> contact
              </>
            ) : null}
          </span>
        </button>
      )}
    </form>
  );
}
