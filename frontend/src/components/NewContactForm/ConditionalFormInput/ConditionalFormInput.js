import React from "react";
import styles from "./ConditionalFormInput.module.css";

export default function ConditionalFormInput({
  icon: Icon,
  inputs,
  setInputs,
  config,
  ...props
}) {
  const isRequired = false;

  function handleInput(e) {
    const nextInputs = { ...inputs, [e.target.id]: e.target.value };
    setInputs(nextInputs);
  }
  return (
    <section className={styles.employmentSection}>
      <Icon className={styles.icon} />
      <select
        value={inputs.status}
        className={styles.employmentStatus}
        onChange={(e) => {
          setInputs({ ...inputs, status: e.target.value });
        }}
        style={{
          color: inputs.status === "" ? "#D3D3D3" : "black",
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
            ({ placeHolder, name, type = "text" }, idx) => {
              return (
                <input
                  key={idx}
                  placeholder={placeHolder}
                  name={name}
                  type={type}
                  min="0"
                  onChange={handleInput}
                  required={isRequired}
                  className={styles.indented}
                ></input>
              );
            }
          )}
        </>
      )}
    </section>
  );
}
