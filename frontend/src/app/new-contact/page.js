"use client";

import React from "react";
import styles from "./new-contact.module.css";
import {
  Phone,
  Cake,
  User,
  Briefcase,
  Heart,
  Mail,
  Plus,
  X,
} from "lucide-react";

export default function Page() {
  function handlePhoneInput() {
    setShowAddPhone(true);
    return;
  }
  const [showAddEmail, setShowAddEmail] = React.useState(false);
  const [showAddPhone, setShowAddPhone] = React.useState(false);
  const [employmentStatus, setEmploymentStatus] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState("");

  const [emailList, setEmailList] = React.useState([
    { id: crypto.randomUUID(), email: "" },
  ]);

  function handleAddEmail(e) {
    setEmailList([
      ...emailList,
      { id: crypto.randomUUID(), email: e.target.value },
    ]);
  }

  function handleEmailInput(e, emailId) {
    const updatedEmailList = emailList.map((email) => {
      if (email.id != emailId) {
        return email;
      }
      return { ...email, email: e.target.value };
    });
    setEmailList(updatedEmailList);
  }

  function handleRemoveEmail(e, emailId) {
    const updatedEmailList = emailList.filter((email) => {
      return email.id != emailId;
    });
    setEmailList(updatedEmailList);
  }

  return (
    <div
      className={styles.wrapper}
      style={{ "--horizontal-spacing": "20px", "--vertical-spacing": "20px" }}
    >
      <form className={styles.form}>
        <section className={styles.nameSection}>
          <User className={styles.icon} />
          <input id="firstName" type="text" placeholder="First name"></input>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className={styles.indented}
          ></input>
        </section>

        <section className={styles.birthdaySection}>
          <Cake className={styles.icon} />
          <input
            placeholder="Add Birthday"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            id="date"
          ></input>
        </section>

        <section className={styles.phoneSection}>
          <Phone className={styles.icon} />
          {showAddPhone && (
            <input
              placeholder="Add another phone"
              type="text"
              id="phone"
              onChange={handlePhoneInput}
            ></input>
          )}
          <input
            placeholder="Add phone"
            type="text"
            id="phone"
            onChange={handlePhoneInput}
            className={styles.indented}
          ></input>
        </section>


            <section className={styles.emailSection}>
          <Mail className={styles.icon} />
          {emailList.map(({ id: emailId }, idx) => {
            return (
              <div
                key={emailId}
                className={`${styles.indented} ${styles.rowWithButtons}`}
              >
                <input
                  placeholder="Add email"
                  type="text"
                  id="email"
                  onChange={(e) => handleEmailInput(e, emailId)}
                ></input>
                <div className={styles.buttonGroup}>
                  {idx === emailList.length - 1 && (
                    <Plus onClick={handleAddEmail} />
                  )}
                  <X onClick={(e) => handleRemoveEmail(e, emailId)} />
                </div>
              </div>
            );
          })}



        <section className={styles.emailSection}>
          <Mail className={styles.icon} />
          {emailList.map(({ id: emailId }, idx) => {
            return (
              <div
                key={emailId}
                className={`${styles.indented} ${styles.rowWithButtons}`}
              >
                <input
                  placeholder="Add email"
                  type="text"
                  id="email"
                  onChange={(e) => handleEmailInput(e, emailId)}
                ></input>
                <div className={styles.buttonGroup}>
                  {idx === emailList.length - 1 && (
                    <Plus onClick={handleAddEmail} />
                  )}
                  <X onClick={(e) => handleRemoveEmail(e, emailId)} />
                </div>
              </div>
            );
          })}
        </section>

        <section className={styles.employmentSection}>
          <Briefcase className={styles.icon} />
          <select
            id="employmentStatus"
            value={employmentStatus}
            className={styles.employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
          >
            <option value="" disabled>
              Add employment status
            </option>
            <option value="unemployed">Unemployed</option>
            <option value="employed">Employed</option>
            <option value="not applicable">Not applicable</option>
          </select>

          {employmentStatus === "employed" && (
            <>
              <input
                placeholder="Job title"
                type="text"
                id="jobTitle"
                className={styles.indented}
              ></input>
              <input
                placeholder="Organization"
                type="text"
                id="organization"
                className={styles.indented}
              ></input>
              <input
                placeholder="Industry"
                type="text"
                id="industry"
                className={styles.indented}
              ></input>
            </>
          )}
        </section>

        <section className={styles.maritalSection}>
          <Heart className={styles.icon} />
          <select
            id="maritalStatus"
            value={maritalStatus}
            className={styles.maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value="" disabled>
              Add marital status
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="unknown">Not applicable</option>
          </select>
        </section>
      </form>
    </div>
  );
}
