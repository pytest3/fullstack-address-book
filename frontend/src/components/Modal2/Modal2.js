import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./Modal2.module.css";
import { X } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Modal2({
  title,
  description,
  children,
  handleDeleteContact,
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />
        <AlertDialog.Content className={styles.content}>
          <AlertDialog.Title className={styles.title}>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.description}>
            {description}
          </AlertDialog.Description>
          <div className={styles.actions}>
            <AlertDialog.Cancel className={`${styles.button} ${styles.cancel}`}>
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              className={`${styles.button} ${styles.action}`}
              asChild
            >
              <button onClick={handleDeleteContact}>Yes, delete</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
