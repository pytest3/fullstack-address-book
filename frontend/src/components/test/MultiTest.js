import React from "react";
import styles from "./MultiTest.module.css";
import { Plus, X, HelpCircle } from "lucide-react";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";

export default function MultiTest({
  icon: Icon = HelpCircle,
  type = "text",
  fetchedData,
  name,
  inputName,
  ...props
}) {
  // const [inputs, setInputs] = React.useState(
  //   fetchedData || [{ id: crypto.randomUUID(), [name]: "" }]
  // );

  const initialState = fetchedData.map((i) => {
    return { id: crypto.randomUUID(), input: i.email_address };
  });

  console.log(initialState);

  const [inputs, setInputs] = React.useState(initialState);
  const { id } = useParams();
  const { user, isLoading } = useUser(id);

  if (!fetchedData) {
    return <h1>LOADING</h1>;
  }

  // React.useEffect(() => {
  //   console.log("i ran");
  //   setInputs(
  //     fetchedData ? fetchedData : [{ id: crypto.randomUUID(), [name]: "" }]
  //   );
  // }, [fetchedData]);

  function handleAddItem(e) {
    setInputs([...inputs, { id: crypto.randomUUID(), input: e.target.value }]);
  }

  const testEmail = user.emails;

  function handleItemInput(e, inputId) {
    console.log(e.target.value);
    console.log(inputs);
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

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  return (
    <section className={styles.inputSection}>
      <Icon className={styles.icon} />
      {inputs?.map((item, idx) => {
        console.log(inputs);
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
