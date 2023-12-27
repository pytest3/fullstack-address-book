import React from "react";
import styles from "./NavBarMain.module.css";
import { Plus, UserCircle, LogOut, Trash2 } from "lucide-react";
import NavBarWrapper from "../NavBarWrapper";
import Link from "next/link";
import Modal2 from "../Modal2";
import { useHttp } from "@/hooks/useHttp";
import { BACKEND_URL } from "@/app/constants";
import { signOut } from "next-auth/react";

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-log-out"
>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" x2="9" y1="12" y2="12" />
</svg>;

export default function NavBarMain({
  isEdit,
  toggleEdit,
  toggleRefresh,
  showContactsInNav,
  selectedCount,
  selectedContacts,
  updateSelectedContacts,
}) {
  const { sendRequest, response } = useHttp(`${BACKEND_URL}/api/contacts`);
  const [vibrate, setVibrate] = React.useState(false);

  async function handleDeleteContact() {
    await sendRequest("DELETE", selectedContacts);
    toggleRefresh(crypto.randomUUID()); // to force client side re-render on form submit
    updateSelectedContacts([]); // to reset selected contacts as part of client side re-render
    toggleEdit(!isEdit);
  }

  return (
    <NavBarWrapper className={styles.wrapper}>
      <div className={styles.leftActions} onClick={toggleEdit}>
        {isEdit ? "Done" : "Edit"}
      </div>
      <div
        className={styles.header}
        style={{
          transform: showContactsInNav ? "translateY(0%)" : "translateY(20%)",
          opacity: showContactsInNav ? 1 : 0,
          transition: showContactsInNav
            ? "opacity 600ms, transform 400ms"
            : "opacity 200ms, transform 400ms",
        }}
      >
        Contacts
      </div>
      <div
        className={styles.rightActions}
        style={{
          transform: isEdit ? "translateX(68px)" : "translateX(0)",
          transition: "transform 500ms",
          transitionTimingFunction: isEdit
            ? "ease-in"
            : "cubic-bezier(.17,.67,.76,1.14)",
        }}
      >
        <Modal2
          title={`Delete ${selectedCount} ${
            selectedCount > 1 ? "contacts?" : "contact?"
          }`}
          description={`Are you sure you want to delete the ${
            selectedCount > 1 ? "contacts?" : "contact?"
          } This action cannot be undone.`}
          selectedCount={selectedCount}
          handleDeleteContact={handleDeleteContact}
        >
          <button
            onClick={(e) => {
              if (selectedCount === 0) {
                e.preventDefault();
                setVibrate(true);
                setTimeout(() => {
                  setVibrate(false);
                }, 550);
                return;
              }
            }}
            className={`${styles.trashIcon} ${vibrate && styles.vibrate}`}
          >
            <Trash2
              style={{
                opacity: isEdit ? 1 : 0,
                color: selectedCount > 0 ? "#bc4749" : "var(--color-gray-3)",
                transition: "opacity 700ms",
                transitionDuration: isEdit ? "700ms" : "200ms",
                transitionDelay: isEdit ? "200ms" : 0,
              }}
            ></Trash2>
          </button>
        </Modal2>

        <div
          className={styles.subRightActions}
          style={{
            opacity: isEdit ? 0 : 1,
            transition: "opacity 300ms",
            transitionDelay: isEdit ? "0ms" : "100ms",
            transitionTimingFunction: isEdit
              ? "ease-in"
              : "cubic-bezier(0,.95,.68,1.9)",
          }}
        >
          <Link href="/new-contact">
            <Plus className={styles.icon} />
          </Link>
          <LogOut
            className={`${styles.icon} ${styles.logOutIcon}`}
            onClick={signOut}
          />
        </div>
      </div>
    </NavBarWrapper>
  );
}
