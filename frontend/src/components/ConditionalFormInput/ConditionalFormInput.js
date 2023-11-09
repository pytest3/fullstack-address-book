import React from "react";
import styles from "./ConditionalFormInput.module.css";

export default function ConditionalFormInput({
  icon: Icon,
  name,
  inputs,
  setInputs,
  config,
  ...props
}) {
  function handleInput(e) {
    const nextInputs = { ...inputs, [e.target.id]: e.target.value };
    console.log(nextInputs);
    setInputs(nextInputs);
  }
  return (
    <section className={styles.employmentSection}>
      <Icon className={styles.icon} />
      <select
        id={name}
        value={inputs.status}
        className={styles.employmentStatus}
        onChange={(e) => {
          setInputs({ ...inputs, status: e.target.value });
        }}
        {...props}
      >
        {config.options.map(({ value, text, disabled }, idx) => {
          return (
            <option key={idx} value={value} disabled={disabled}>
              {text}
            </option>
          );
        })}
      </select>

      {inputs.status === config.showCondition && (
        <>
          {config.conditionalFields.map(
            ({ placeHolder, id, type = "text" }, idx) => {
              return (
                <input
                  key={idx}
                  placeholder={placeHolder}
                  type={type}
                  min="0"
                  id={id}
                  className={styles.indented}
                  onChange={handleInput}
                  required
                ></input>
              );
            }
          )}
        </>
      )}
    </section>
  );
}
