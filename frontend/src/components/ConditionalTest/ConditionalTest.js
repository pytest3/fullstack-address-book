import React from "react";
import styles from "./ConditionalTest.module.css";

export default function ConditionalTest({
  icon: Icon,
  config,
  isRequired,
  fetchedData,
  initialState,
}) {
  const [inputs, setInputs] = React.useState(fetchedData || initialState);

  React.useEffect(() => {
    setInputs(fetchedData ? fetchedData : initialState);
  }, [fetchedData]);

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
          color: inputs.status === "" ? "grey" : "black",
        }}
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
