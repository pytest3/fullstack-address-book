import React from "react";
import styles from "./DeleteForm.module.css";
import Link from "next/link";
import InitialsAvatar from "../InitialsAvatar";
import { MoveUp } from "lucide-react";

export default function DeleteForm({
  onSubmit,
  filteredContacts,
  isEdit,
  selectedContacts,
  updateSelectedContacts,
  showScrollButton,
  handleUpButtonClick,
  ...rest
}) {
  return (
    <form
      className={styles.nameListWrapper}
      id="edit-form"
      onSubmit={onSubmit}
      {...rest}
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
