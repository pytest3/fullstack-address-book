import React from "react";
import styles from "./MultiLineField.module.css";
import { Plus, X, HelpCircle } from "lucide-react";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";

export default function MultiLineField({
  icon: Icon = HelpCircle,
  type = "text",
  fetchedData,
  name,
  inputName,
  ...props
}) {
  const [inputs, setInputs] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    setInputs(fetchedData);
  }, [fetchedData]);

  const { user, isLoading } = useUser(id);

  function handleAddItem(e) {
    setInputs([...inputs, { id: crypto.randomUUID(), email_address: "" }]);
  }

  // console.log("+++++++++");
  // console.log(name);
  // console.log(inputs);

  function handleItemInput(e, inputId) {
    const updatedItemList = inputs?.map((input) => {
      if (input.id != inputId) {
        return input;
      }
      return { ...input, [inputName]: e.target.value };
    });
    setInputs(updatedItemList);
  }

  function handleRemoveItem(e, inputId) {
    const updatedItemList = inputs?.filter((input) => {
      return input.id != inputId;
    });
    setInputs(updatedItemList);
  }

  if (isLoading || !fetchedData) {
    return <div>Loading user details...</div>;
  }

  return (
    <section className={styles.inputSection}>
      <Icon className={styles.icon} />
      {inputs?.map((item, idx) => {
        const { id: inputId } = item;
        return (
          <div
            key={inputId}
            className={`${styles.indented} ${styles.rowWithButtons}`}
          >
            <input
              placeholder={`Add ${name}`}
              type={type}
              onChange={(e) => handleItemInput(e, inputId)}
              name={name}
              value={item[`${inputName}`]}
              className={styles.input}
              {...props}
            ></input>
            <div className={styles.buttonGroup}>
              {idx === inputs.length - 1 && (
                <Plus className={styles.plusIcon} onClick={handleAddItem} />
              )}
              {inputs.length > 1 && (
                <X
                  className={styles.crossIcon}
                  onClick={(e) => handleRemoveItem(e, inputId)}
                />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
