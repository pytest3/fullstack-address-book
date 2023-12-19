import React from "react";
import styles from "./BirthdayFieldInput.module.css";

export default function BirthdayFieldInput({
  icon: Icon,
  fetchedData,
  required,
}) {
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    const userBirthday = fetchedData?.split("T")[0];
    setInput(userBirthday);
  }, [fetchedData]);

  function handleNameInput(e) {
    setInput(e.target.value);
  }

  console.log(input);

  return (
    <section className={styles.nameSection}>
      <Icon className={styles.icon} />
      <input
        className={styles.birthdayInput}
        name="birthday"
        type="date"
        onChange={handleNameInput}
        required={required}
        value={input || ""}
      ></input>
    </section>
  );
}
