"use client";

import React from "react";
import styles from "./NameList.module.css";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";
import Link from "next/link";
import { BACKEND_URL } from "@/app/constants";
import LoadingScreen from "../LoadingScreen";
import ScrollTopButton from "../ScrollTopButton";
import fetcher from "@/utils/fetcher";

function NameList({
  isEdit,
  updateSelectedContacts,
  selectedContacts,
  searchTerm = "",
  setContactCount,
}) {
  const config = React.useMemo(
    () => ({
      headers: { "ngrok-skip-browser-warning": true },
    }),
    []
  );

  const { data, error, isLoading } = useSWR(
    [`${BACKEND_URL}/api/contacts`, config],
    fetcher
  );

  React.useEffect(() => {
    setContactCount(data?.length);
  }, [data]);

  const filteredContacts = React.useMemo(() => {
    return data?.filter(
      (contact) =>
        contact.first_name.includes(searchTerm) ||
        contact.last_name.includes(searchTerm)
    );
  }, [data, searchTerm]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  if (filteredContacts?.length === 0) {
    return <div className={styles.noContacts}>No contacts found</div>;
  }

  return (
    <form className={styles.nameListWrapper} id="edit-form">
      {filteredContacts?.map(({ id, first_name, last_name }) => {
        return (
          <div key={id} className={styles.row}>
            <div
              style={{
                opacity: isEdit ? 1 : 0,
                transition: "opacity",
                transitionDuration: isEdit ? "600ms" : "100ms",
                transitionDelay: isEdit ? "150ms" : "50ms",
              }}
              className={styles.checkBoxWrapper}
            >
              <input
                name={id}
                type="checkbox"
                className={styles.checkBox}
                onChange={(e) => updateSelectedContacts(e)}
                checked={selectedContacts.includes(id)}
              ></input>
            </div>

            <Link href={`./contact-details/${id}`} className={styles.link}>
              <article
                key={id}
                style={{
                  willChange: "transform",
                  transform: isEdit ? "translateX(0)" : "translateX(-32px)",
                  transition: "transform 500ms",
                  transitionTimingFunction: isEdit
                    ? "cubic-bezier(.09,.69,.52,1.32)"
                    : "cubic-bezier(.09,.69,.52,1)",
                }}
                className={styles.card}
              >
                <InitialsAvatar
                  firstName={first_name}
                  lastName={last_name}
                  className={styles.initialsAvatar}
                  fontSize="20px"
                  circleSize="52px"
                />
                <div className={`${styles.name} ${styles.contactInfo}`}>
                  {first_name}
                </div>
                <div className={`${styles.job} ${styles.contactInfo}`}>
                  {last_name}
                </div>
              </article>
            </Link>
          </div>
        );
      })}
      <ScrollTopButton scrollTarget=".SearchBar_header__IE462" />
      {/* <ScrollTopButton scrollTarget=".SearchBar_input__6K5rC" /> */}
    </form>
  );
}

export default React.memo(NameList);
