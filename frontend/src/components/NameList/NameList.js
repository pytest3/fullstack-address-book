"use client";

import React from "react";
import styles from "./NameList.module.css";
import { MoveUp } from "lucide-react";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";
import Link from "next/link";
import { BACKEND_URL } from "@/app/constants";
import LoadingScreen from "../LoadingScreen";

export default function NameList({
  isEdit,
  updateSelectedContacts,
  selectedContacts,
  searchTerm = "",
}) {
  async function fetcher([url, options]) {
    const res = await fetch(url, options);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data");
      error.status = res.status;
      throw error;
    }

    const contacts = await res.json();

    return contacts;
  }

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

  const filteredContacts = data?.filter(
    (contact) =>
      contact.first_name.includes(searchTerm) ||
      contact.last_name.includes(searchTerm)
  );

  const [showScrollButton, setShowScrollButton] = React.useState(false);

  React.useEffect(() => {
    const scrollContainer = document.querySelector(".__className_e66fe9");

    function handleScrollButtonVisibility() {
      console.log(scrollContainer.scrollTop);
      if (scrollContainer.scrollTop > 120) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
    scrollContainer.addEventListener("scroll", handleScrollButtonVisibility);
    return () =>
      scrollContainer.removeEventListener(
        "scroll",
        handleScrollButtonVisibility
      );
  }, []);

  function handleUpButtonClick(e) {
    e.preventDefault();
    const target = document.querySelector(".SearchBar_header__IE462");
    target.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  if (filteredContacts.length === 0) {
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
                <div className={styles.name}>{first_name}</div>
                <div className={styles.job}>{last_name}</div>
              </article>
            </Link>
          </div>
        );
      })}

      <button
        className={styles.scrollTopBtn}
        style={{
          opacity: showScrollButton ? 1 : 0,
          transform: showScrollButton ? "translateY(0px)" : "translateY(100px)",
          transition: "opacity, transform ",
          transitionTimingFunction: showScrollButton
            ? "linear, cubic-bezier(0,1.47,.82,1.56)"
            : "linear, ease-in",
          transitionDuration: showScrollButton
            ? "300ms, 400ms"
            : "300ms, 400ms",
        }}
        type="button"
        onClick={handleUpButtonClick}
      >
        <MoveUp className={styles.upIcon} strokeWidth={1.5} />
        <span>To top</span>
      </button>
    </form>
  );
}
