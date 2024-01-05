import React from "react";
import styles from "./NavBarMain.module.css";
import { Plus, UserCircle, LogOut, Trash2 } from "lucide-react";
import NavBarWrapper from "../NavBarWrapper";
import Link from "next/link";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { useHttp } from "@/hooks/useHttp";
import { BACKEND_URL } from "@/app/constants";
import { signOut } from "next-auth/react";
import {
  ProfileModal,
  ProfileModalContent,
  ProfileModalTrigger,
} from "../ProfileModal";
import { capitalizeFirstLetter } from "@/utils";

export default function NavBarMain({
  isEdit,
  toggleEdit,
  toggleRefresh,
  showContactsInNav,
  selectedCount,
  selectedContacts,
  updateSelectedContacts,
  session,
}) {
  const { sendRequest } = useHttp(`${BACKEND_URL}/api/contacts`);
  const [vibrate, setVibrate] = React.useState(false);

  const user = {
    firstName: capitalizeFirstLetter(session?.user?.name.split(" ")[0]),
    lastName: capitalizeFirstLetter(session?.user?.name.split(" ")[1]),
    firstNameInitial: session?.user?.name.split(" ")[0][0].toUpperCase(),
    lastNameInitial: session?.user?.name.split(" ")[1]?.[0].toUpperCase(),
    email: session?.user?.email,
  };

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
          transform: isEdit ? "translateX(66px)" : "translateX(0)",
          transition: "transform 500ms",
          transitionTimingFunction: isEdit
            ? "ease-in"
            : "cubic-bezier(.17,.67,.76,1.14)",
        }}
      >
        <ConfirmDeleteModal
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
                // color: selectedCount > 0 ? "#bc4749" : "var(--color-gray-5)",
                color:
                  selectedCount > 0
                    ? "var(--color-gray-7"
                    : "var(--color-gray-5)",
                transition: "opacity 700ms",
                transitionDuration: isEdit ? "700ms" : "200ms",
                transitionDelay: isEdit ? "200ms" : 0,
              }}
            ></Trash2>
          </button>
        </ConfirmDeleteModal>

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
          <Link href="/new-contact" className={styles.plusIconWrapper}>
            <Plus className={styles.icon} />
          </Link>
          {/* <LogOut
            className={`${styles.icon} ${styles.logOutIcon}`}
            onClick={signOut}
          /> */}
          <ProfileModal>
            <ProfileModalTrigger className={styles.profileAvatarWrapper}>
              <div className={styles.profileAvatar}>
                <span>{user.firstNameInitial}</span>
                <span>{user.lastNameInitial}</span>
              </div>
            </ProfileModalTrigger>
            <ProfileModalContent user={user} />
          </ProfileModal>
        </div>
      </div>
    </NavBarWrapper>
  );
}
