import React from "react";
import styles from "./BirthdayFieldInput.module.css";

export default function BirthdayFieldInput({
  icon: Icon,
  fetchedData,
  required,
}) {
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    const userBirthday = new Date(fetchedData).toLocaleDateString("en-CA");
    setInput(userBirthday);
  }, [fetchedData]);

  function handleNameInput(e) {
    setInput(e.target.value);
  }

  return (
    <section className={styles.nameSection}>
      <Icon className={styles.icon} />
      <input
        name="birthday"
        type="date"
        onChange={handleNameInput}
        required={required}
        value={input}
      ></input>
    </section>
  );
}
