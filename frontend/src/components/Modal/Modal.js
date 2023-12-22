import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./Modal.module.css";
import { X } from "lucide-react";

export default function Modal({
  title,
  isOpen,
  handleCloseModal,
  description,
  children,
}) {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={handleCloseModal} className={styles.wrapper}>
        <Transition.Child
          // as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-90"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.backDrop} />
        </Transition.Child>
        <Transition.Child
          // as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className={styles.dialog}>
            <Dialog.Title className={styles.modalTitle}>{title}</Dialog.Title>
            {description && (
              <Dialog.Description className={styles.modalDescription}>
                {description}
              </Dialog.Description>
            )}
            {children}
            <button onClick={handleCloseModal} className={styles.closeButton}>
              <X />
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
