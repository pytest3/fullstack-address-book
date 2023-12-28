import React from "react";
import styles from "./ConditionalParentField.module.css";

const config = {
  showCondition: "parent",
  options: [
    { value: "", text: "Add parenthood status", disabled: true },
    { value: "parent", text: "Parent" },
    { value: "notParent", text: "Not parent" },
  ],
  conditionalFields: [
    {
      placeHolder: "Number of daughter(s)",
      name: "daughterCount",
      type: "number",
    },
    {
      placeHolder: "Number of son(s)",
      name: "sonCount",
      type: "number",
    },
  ],
};

export default function ConditionalParentField({
  icon: Icon,
  isRequired,
  fetchedData,
  ...rest
}) {
  const [inputs, setInputs] = React.useState({
    condition: "",
    daughterCount: "",
    sonCount: "",
  });

  const { son_count, daughter_count, parentStatus } = fetchedData;

  React.useEffect(() => {
    setInputs({
      ...inputs,
      status: parentStatus,
      sonCount: son_count,
      daughterCount: daughter_count,
    });
  }, [fetchedData]);

  function handleInput(e) {
    const nextInputs = { ...inputs, [e.target.name]: e.target.value };
    setInputs(nextInputs);
  }

  return (
    <section className={styles.employmentSection}>
      <Icon className={styles.icon} />
      <select
        value={inputs.status}
        className={styles.select}
        onChange={(e) => {
          setInputs({ ...inputs, status: e.target.value });
        }}
        style={{
          color: parentStatus ? "black" : "grey",
        }}
        {...rest}
      >
        {config.options.map(({ value, text, disabled }, idx) => {
          return (
            <option key={idx} value={value} disabled={disabled}>
              {text}
            </option>
          );
        })}
      </select>

      {inputs.status === "parent" && (
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
                  value={inputs[name]}
                ></input>
              );
            }
          )}
        </>
      )}
    </section>
  );
}
