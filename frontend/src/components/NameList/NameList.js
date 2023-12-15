"use client";

import React from "react";
import styles from "./NameList.module.css";

import { MoveUp, Trash2 } from "lucide-react";
import useSWR from "swr";
import InitialsAvatar from "../InitialsAvatar";
import Link from "next/link";
import { useHttp } from "@/hooks/useHttp";
import Modal from "../Modal";
import { BACKEND_URL } from "@/app/constants";

export default function NameList({
  isEdit,
  toggleEdit,
  updateSelectedContacts,
  selectedContacts,
  contactListCount,
  updateContactListCount,
  toggleRefresh,
  searchTerm = "",
  showModal,
  setShowModal,
}) {
  console.log(selectedContacts);
  console.log(typeof selectedContacts);
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

    updateContactListCount(contacts.length);

    return contacts;
  }

  const { data, error, isLoading } = useSWR(
    `${BACKEND_URL}/api/contacts`,
    fetcher
  );

  const filteredContacts = data?.filter(
    (contact) =>
      contact.first_name.includes(searchTerm) ||
      contact.last_name.includes(searchTerm)
  );

  const { sendRequest, response } = useHttp(
    `${BACKEND_URL}/api/contacts/${selectedContacts}`
  );
  const [showButton, setShowButton] = React.useState(false);
  const [buttonNode, setButtonNode] = React.useState(null);

  function handleCloseModal() {
    setShowModal(false);
  }

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
      setShowButton(false);
      /* manual cleanup of intersection observer and early return*/
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
    handleCloseModal();
  }

  if (filteredContacts.length === 0) {
    return <div className={styles.noContacts}>No contacts found</div>;
  }

  return (
    <>
      <Modal
        title="Delete contact"
        isOpen={showModal}
        handleCloseModal={handleCloseModal}
        description="Are you sure you want to delete the contact? This action cannot be undone."
      >
        <div className={styles.deleteButtonWrapper}>
          <button className={styles.deleteContactButton} form={"edit-form"}>
            Delete
          </button>
        </div>
      </Modal>
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
