"use client";

import React from "react";
import styles from "./new-contact.module.css";
import { Phone, Cake, User, Briefcase, Heart } from "lucide-react";

export default function Page() {
  function handlePhoneInput(e) {
    setShowAddPhone(true);
    return;
  }
  const [showAddPhone, setShowAddPhone] = React.useState(false);
  const [hasMultiplePhones, setHasMultiplePhones] = React.useState(false);
  const [employmentStatus, setEmploymentStatus] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState("");

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
            className={styles.lastName}
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
            className={styles.multiplePhone}
          ></input>
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
