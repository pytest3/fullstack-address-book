"use client";

import React from "react";
import styles from "./new-contact.module.css";
import {
  Phone,
  Cake,
  User,
  Briefcase,
  Heart,
  Mail,
  Gamepad2,
  PersonStanding,
  Baby,
} from "lucide-react";

import MultiLineFormInput from "@/components/MultiLineFormInput";
import ConditionalFormInput from "@/components/ConditionalFormInput";

export default function Page() {
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [emailList, setEmailList] = React.useState([
    { id: crypto.randomUUID(), email: "" },
  ]);
  const [phoneList, setPhoneList] = React.useState([
    { id: crypto.randomUUID(), phone: "" },
  ]);
  const [hobbyList, setHobbyList] = React.useState([
    { id: crypto.randomUUID(), hobby: "" },
  ]);

  const [categoryList, setCategoryList] = React.useState([
    { id: crypto.randomUUID(), category: "" },
  ]);

  const [employmentStatus, setEmploymentStatus] = React.useState({
    status: "",
    organization: null,
    industry: null,
    jobTitle: null,
  });

  const [parentHoodStatus, setParentHoodStatus] = React.useState({
    status: "",
    daughterCount: null,
    sonCount: null,
  });

  const employmentConfig = {
    showCondition: "employed",
    options: [
      { value: "", text: "Add employment status", disabled: true },
      { value: "unemployed", text: "Unemployed" },
      { value: "employed", text: "Employed" },
      { value: "notApplicable", text: "Not applicable" },
    ],
    conditionalFields: [
      { placeHolder: "Job title", id: "jobTitle" },
      { placeHolder: "Organization", id: "organization" },
      { placeHolder: "Industry", id: "industry" },
    ],
  };

  const parentHoodConfig = {
    showCondition: "parent",
    options: [
      { value: "", text: "Add parenthood status", disabled: true },
      { value: "parent", text: "Parent" },
      { value: "notParent", text: "Not parent" },
    ],
    conditionalFields: [
      {
        placeHolder: "Number of daughter(s)",
        id: "daughterCount",
        type: "number",
      },
      { placeHolder: "Number of son(s)", id: "sonCount", type: "number" },
    ],
  };

  return (
    <div
      className={styles.wrapper}
      style={{ "--horizontal-spacing": "20px", "--vertical-spacing": "20px" }}
    >
      <form className={styles.form}>
        <button>save</button>
        <section className={styles.nameSection}>
          <User className={styles.icon} />
          <input id="firstName" type="text" placeholder="First name"></input>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className={styles.indented}
          ></input>
        </section>

        <section className={styles.birthdaySection}>
          <Cake className={styles.icon} />
          <input
            placeholder="Add Birthday"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            id="date"
          ></input>
        </section>

        <ConditionalFormInput
          icon={Briefcase}
          name="employment"
          inputs={employmentStatus}
          setInputs={setEmploymentStatus}
          config={employmentConfig}
        />

        <ConditionalFormInput
          icon={Baby}
          name="parentHoodStatus"
          inputs={parentHoodStatus}
          setInputs={setParentHoodStatus}
          config={parentHoodConfig}
        />

        <MultiLineFormInput
          icon={Mail}
          name="email"
          inputs={emailList}
          setInputs={setEmailList}
        />

        <MultiLineFormInput
          icon={Phone}
          name="phone"
          inputs={phoneList}
          setInputs={setPhoneList}
        />

        <MultiLineFormInput
          icon={Gamepad2}
          name="hobby"
          inputs={hobbyList}
          setInputs={setHobbyList}
        />

        <MultiLineFormInput
          icon={PersonStanding}
          name="category"
          inputs={categoryList}
          setInputs={setCategoryList}
        />

        <section className={styles.maritalSection}>
          <Heart className={styles.icon} />
          <select
            id="maritalStatus"
            value={maritalStatus}
            className={styles.maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
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
      </form>
    </div>
  );
}
