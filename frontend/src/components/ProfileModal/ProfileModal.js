import React from "react";
import styles from "./ProfileModal.module.css";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import UserProfile from "../UserProfile";
import { X } from "lucide-react";

export const ProfileModalContent = React.forwardRef(
  ({ children, user, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={styles.content}
      >
        <UserProfile user={user}>
          <DialogPrimitive.Close aria-label="Close" asChild>
            <X className={styles.closeBtn} />
          </DialogPrimitive.Close>
        </UserProfile>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

export const ProfileModal = DialogPrimitive.Root;
export const ProfileModalTrigger = DialogPrimitive.Trigger;
