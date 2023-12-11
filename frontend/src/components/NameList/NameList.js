"use client";

import React from "react";
import styles from "./NameList.module.css";

import { MoveUp, Trash2 } from "lucide-react";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";
import Link from "next/link";
import { useHttp } from "@/hooks/useHttp";

export default function NameList({
  isEdit,
  toggleEdit,
  updateSelectedContacts,
  selectedContacts,
  contactListCount,
  updateContactListCount,
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

    const contacts = await res.json();

    console.log(contacts);

    updateContactListCount(contacts.length);

    console.log(contacts.length);

    return contacts;
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
  const [showButton, setShowButton] = React.useState(false);
  const [buttonNode, setButtonNode] = React.useState(null);

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const titleRef = React.useState(null);
  const observerRef = React.useRef(null);
  const buttonRef = React.useCallback((node) => {
    if (node !== null) {
      setButtonNode(node);
    }
  }, []);

  function getObserver() {
    // IntersectionObserver is created lazily once
    if (observerRef.current === null) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setShowButton(true);
          console.log("intersecting");
        } else {
          setShowButton(false);
          console.log("NOT intersecting");
        }
      }, options);
    }
    return observerRef.current;
  }

  React.useEffect(() => {
    const observer = getObserver();

    if (contactListCount < 12) {
      /* manual cleanup */
      console.log("less than 12 ran to disconnect observer");
      setShowButton(false);
      observer?.disconnect();
      return;
    }

    if (buttonNode) {
      observer.observe(buttonNode);
    }

    return () => {
      observer?.disconnect();
    };
  }, [buttonNode, contactListCount]);

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
    <>
      <form
        className={styles.nameListWrapper}
        id="edit-form"
        onSubmit={handleSubmit}
      >
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
                className={styles.checkBox}
              >
                <input
                  name={id}
                  type="checkbox"
                  className={styles.radio}
                  onChange={(e) => updateSelectedContacts(e)}
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
        {/* {isEdit && (
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
        )} */}
        <button
          ref={buttonRef}
          className={styles.backToTopBtn}
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? "translateY(-05px)" : "translateY(0px)",
            transition:
              "opacity 600ms, transform 650ms cubic-bezier(.17,.67,.71,8.86)",
          }}
          type="button"
          onClick={handleUpButtonClick}
        >
          <MoveUp className={styles.upIcon} strokeWidth={1.5} />
          <span>To top</span>
        </button>
      </form>
    </>
  );
}
