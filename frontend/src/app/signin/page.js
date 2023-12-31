"use client";

import React from "react";
import styles from "./signIn.module.css";
import { signIn } from "next-auth/react";
import MainSignInButton from "@/components/MainSignInButton";

export default function page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <article className={styles.heroImageWrapper}>
          <div className={styles.squareFlourish}></div>
          <div className={styles.circleFlourish}></div>
          <div className={styles.heroImageBG}></div>
          <img className={styles.heroImage} src="/hero-image-pink.svg"></img>
        </article>
      </div>
      <div className={styles.signInPanel}>
        <div className={styles.hideOverFlow}>
          <article className={styles.welcomeMessage}>
            <h1 className={styles.header}>Your personal address book</h1>
            <div className={styles.message}>
              Welcome to your personal address book! Sign in to effortlessly
              manage, update, and organize your contacts, keeping your
              connections at your fingertips.
            </div>
          </article>
        </div>
        <MainSignInButton
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
        ></MainSignInButton>
      </div>
    </div>
  );
}
