import React from "react";
import styles from "./MultiLineFormInput.module.css";
import { Plus, X, HelpCircle } from "lucide-react";

export default function MultiLineFormInput({
  icon: Icon = HelpCircle,
  name,
  type = "text",
  inputs,
  setInputs,
  ...props
}) {
  function handleAddItem(e) {
    setInputs([...inputs, { id: crypto.randomUUID(), input: e.target.value }]);
  }

  function handleItemInput(e, inputId) {
    const updatedItemList = inputs.map((input) => {
      if (input.id != inputId) {
        return input;
      }
      return { ...input, input: e.target.value };
    });
    setInputs(updatedItemList);
  }

  function handleRemoveItem(e, inputId) {
    const updatedItemList = inputs.filter((input) => {
      return input.id != inputId;
    });
    setInputs(updatedItemList);
  }

  return (
    <section className={styles.inputSection}>
      <Icon className={styles.icon} />
      {inputs.map(({ id: inputId }, idx) => {
        console.log(idx);
        return (
          <div
            key={inputId}
            className={`${styles.indented} ${styles.rowWithButtons}`}
          >
            <input
              placeholder={`Add ${name}`}
              type={type}
              id={`${name}`}
              onChange={(e) => handleItemInput(e, inputId)}
              {...props}
            ></input>
            <div className={styles.buttonGroup}>
              {idx === inputs.length - 1 && <Plus onClick={handleAddItem} />}
              <X onClick={(e) => handleRemoveItem(e, inputId)} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
