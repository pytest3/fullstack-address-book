"use client";

import React from "react";
import styles from "./ContactDetails.module.css";
import {
  Cake,
  Mail,
  Briefcase,
  Baby,
  Phone,
  Gamepad2,
  PersonStanding,
  Heart,
} from "lucide-react";
import useSWR from "swr";
import NavBarDetails from "@/components/NavBarDetails";
import InitialsAvatar from "@/components/InitialsAvatar";
import { capitalizeFirstLetter } from "@/utils";
import { BACKEND_URL } from "@/app/constants";

export default function Page({ params }) {
  const { id } = params;

  const targetElement = React.useRef();
  const [showNameInNav, setShowNameInNav] = React.useState(false);
  const [nameInNavOpacity, setNameInNavOpacity] = React.useState(0);

  const fetcher = async ([url, options]) =>
    fetch(url, options).then((res) => {
      if (!res.ok) {
        const error = new Error();
        error.message = "An error occurred while loading user details page";
        throw error;
      }
      return res.json();
    });

  const { data, error, isLoading } = useSWR(
    [
      `${BACKEND_URL}/api/contacts/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": true, // bypass ngrok browser warning
        },
      },
    ],
    fetcher
  );

  const {
    birthday = "",
    is_parent,
    is_employed,
    contact_phone_numbers = [],
    emails = [],
    first_name,
    last_name,
    hobbies,
    categories,
    marital_status,
  } = data ?? {};

  const company_industry = data?.employment_detail?.company_industry;
  const role = data?.employment_detail?.role;
  const company_name = data?.employment_detail?.company_name;
  const daughter_count = data?.parenthood_detail?.daughter_count;
  const son_count = data?.parenthood_detail?.son_count;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const [fontColor, setFontColor] = React.useState("black");

  React.useEffect(() => {
    const target = targetElement.current;

    if (!target) {
      return;
    }

    let observer = new IntersectionObserver((entries, observer) => {
      const [entry] = entries;
      entry.target.style.opacity = entry.intersectionRatio;
      if (entry.intersectionRatio > 0.2) {
        setShowNameInNav(false);
        setNameInNavOpacity(entry.intersectionRatio);
      } else {
        setShowNameInNav(true);
        entry.target.style.opacity = 0;
      }
    }, options);
    observer.observe(target);
    return () => observer.unobserve(target);
  }, [isLoading]);

  if (error) {
    console.log("error");
    return <div>failed to load</div>;
  }
  if (isLoading) {
    console.log("loading");
    return <div>loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <NavBarDetails
        name={{ first_name, last_name }}
        showNameInNav={showNameInNav}
        opacity={nameInNavOpacity}
      />

      <div className={styles.greyBG}>
        <div ref={targetElement} className={styles.userSummary}>
          <InitialsAvatar
            firstName={first_name}
            lastName={last_name}
            circleSize="70px"
            fontSize="30px"
            className={styles.avatar}
            fontClassName={styles.avatarFont}
          ></InitialsAvatar>
          <div className={styles.fullName} style={{ color: fontColor }}>
            {capitalizeFirstLetter(first_name)}{" "}
            {capitalizeFirstLetter(last_name)}
          </div>
          <div className={styles.jobInfo}>
            <span className={styles.jobText}>
              {capitalizeFirstLetter(role)}
              {!role || !company_name ? " " : ", "}
              {capitalizeFirstLetter(company_name)}
            </span>
          </div>
        </div>
      </div>

      <main className={styles.whiteBG}>
        <section className={styles.section}>
          <Cake className={styles.icon} />
          <div className={styles.row}>
            <span>{new Date(birthday).toLocaleDateString()}</span>
            <span className={styles.smallText}>Birthday | dd/mm/yyyy</span>
          </div>
        </section>
        <section className={styles.section}>
          <Phone className={styles.icon} />
          {contact_phone_numbers.map(({ phone_number }, idx) => {
            let className = `${styles.row}`;
            if (idx != 0) className = `${styles.row} ${styles.indented}`;
            return (
              <div key={idx} className={className}>
                {phone_number}
              </div>
            );
          })}
        </section>
        <section className={styles.section}>
          <Mail className={styles.icon} />
          {emails.map(({ email_address }, idx) => {
            let className = `${styles.row}`;
            if (idx != 0) className = `${styles.row} ${styles.indented}`;
            return (
              <div key={idx} className={className}>
                {email_address}
              </div>
            );
          })}
        </section>
        <section className={styles.section}>
          <Briefcase className={styles.icon} />
          <div className={styles.row}>
            {is_employed === "employed  " ? (
              <>
                <span>{company_industry}</span>
                <span className={styles.smallText}>Job industry</span>
              </>
            ) : (
              "Unemployed"
            )}
          </div>
        </section>
        <section className={styles.section}>
          <Heart className={styles.icon} />
          <div className={styles.row}>
            <span>{marital_status}</span>
            <span className={styles.smallText}>Marital status</span>
          </div>
        </section>
        {is_parent === "parent" ? (
          <section className={styles.section}>
            <Baby className={styles.icon} />
            <div className={styles.row}>
              <span>{son_count}</span>
              <span className={styles.smallText}>Son(s)</span>
            </div>
            <div className={`${styles.row} ${styles.indented}`}>
              <span>{daughter_count}</span>
              <span className={styles.smallText}>Daughter(s)</span>
            </div>
          </section>
        ) : (
          <section className={styles.section}>
            <Baby className={styles.icon} />
            <div className={styles.row}>Not a parent</div>
          </section>
        )}

        <section className={styles.section}>
          <Gamepad2 className={styles.icon} />
          {hobbies.map(({ hobby_name }, idx) => {
            let className = `${styles.row}`;
            if (idx != 0) className = `${styles.row} ${styles.indented}`;
            return (
              <div key={idx} className={`${styles.row} ${styles.indented}`}>
                <span>{hobby_name}</span>
                <span className={styles.smallText}>Hobby {idx + 1}</span>
              </div>
            );
          })}
        </section>

        <section className={styles.section}>
          <PersonStanding className={styles.icon} />
          {categories?.map(({ category_name }, idx) => {
            let className = `${styles.row}`;
            if (idx != 0) className = `${styles.row} ${styles.indented}`;
            return (
              <div key={idx} className={`${className} ${styles.row}`}>
                <span>{category_name}</span>
                <span className={styles.smallText}>Contact category</span>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
