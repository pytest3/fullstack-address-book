import React from "react";
import styles from "./NameFieldInput.module.css";
import { NameContext } from "../NameProvider/NameProvider";

export default function NameFieldInput({ icon: Icon, required }) {
  const { name, handleNameInput } = React.useContext(NameContext);

  const { firstName, lastName } = name;

  // React.useEffect(() => {
  //   const { first_name: firstName, last_name: lastName } = fetchedData;
  //   setName({ firstName, lastName });
  // }, [fetchedData]);

  // function handleNameInput(e) {
  //   const nextName = { ...name, [e.target.name]: e.target.value };
  //   setName(nextName);
  // }
  return (
    <section className={styles.nameSection}>
      <Icon className={styles.icon} />
      <input
        name="firstName"
        type="text"
        onChange={handleNameInput}
        required={required}
        value={firstName}
        placeholder="First name"
        className={styles.input}
      ></input>
      <input
        name="lastName"
        type="text"
        onChange={handleNameInput}
        className={`${styles.indented} ${styles.input}`}
        required={required}
        value={lastName}
        placeholder="Last name"
      ></input>
    </section>
  );
}
