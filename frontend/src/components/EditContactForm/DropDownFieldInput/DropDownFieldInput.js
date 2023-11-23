import React from "react";
import styles from "./DropDownFieldInput.module.css";

export default function DropDownFieldInput({
  icon: Icon,
  fetchedData,
  required,
}) {
  const [inputs, setInputs] = React.useState("");

  React.useEffect(() => {
    setInputs(fetchedData);
  }, [fetchedData]);

  return (
    <section className={styles.maritalSection}>
      <Icon className={styles.icon} />
      <select
        name="maritalStatus"
        value={inputs}
        className={styles.maritalStatus}
        onChange={(e) => setInputs(e.target.value)}
        required={required}
        style={{ color: inputs === "" ? "grey" : "black" }}
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
  );
}
