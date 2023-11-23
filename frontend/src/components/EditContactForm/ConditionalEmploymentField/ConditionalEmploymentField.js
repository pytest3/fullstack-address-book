import React from "react";
import styles from "./ConditionalEmploymentField.module.css";

const config = {
  showCondition: "employed",
  options: [
    { value: "", text: "Add employment status", disabled: true },
    { value: "unemployed", text: "Unemployed" },
    { value: "employed", text: "Employed" },
    { value: "notApplicable", text: "Not applicable" },
  ],
  conditionalFields: [
    { placeHolder: "Job title", name: "jobTitle" },
    { placeHolder: "Organization", name: "organization" },
    { placeHolder: "Industry", name: "industry" },
  ],
};

export default function ConditionalEmploymentField({
  icon: Icon,
  isRequired,
  fetchedData,
  initialState,
  ...rest
}) {
  const [inputs, setInputs] = React.useState({
    status: "",
    organization: "",
    industry: "",
    jobTitle: "",
  });

  const { company_industry, company_name, role, employmentStatus } =
    fetchedData;

  React.useEffect(() => {
    setInputs({
      ...inputs,
      status: employmentStatus,
      organization: company_name,
      industry: company_industry,
      jobTitle: role,
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
        className={styles.employmentStatus}
        onChange={(e) => {
          setInputs({ ...inputs, status: e.target.value });
        }}
        style={{
          color: employmentStatus ? "black" : "grey",
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

      {inputs.status === "employed" && (
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
                  value={inputs[name] || ""}
                ></input>
              );
            }
          )}
        </>
      )}
    </section>
  );
}
