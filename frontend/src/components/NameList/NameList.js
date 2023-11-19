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
  updateSelectedContacts,
  selectedContacts,
  selectedCount,
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

  const { sendRequest } = useHttp("/api/contacts/:userId");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedContacts);
    sendRequest("DELETE", selectedContacts);
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      {data?.map(({ id, first_name, last_name }) => {
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
