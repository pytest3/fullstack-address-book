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

import DatePicker from "react-datepicker";
import MultiLineFormInput from "@/components/NewContactForm/MultiLineFormInput";
import ConditionalFormInput from "@/components/NewContactForm/ConditionalFormInput";
import NavBarForm from "@/components/NavBarForm";
import InitialsAvatar from "@/components/InitialsAvatar";
import { useHttp } from "@/hooks/useHttp";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../constants";

export default function Page() {
  const isRequired = true;

  const birthdayRef = React.useRef("text");
  const testBirthdayRef = React.useRef("text");

  const router = useRouter();

  const { isLoading, isError, sendRequest } = useHttp(
    `${BACKEND_URL}/api/contacts`
  );

  const [name, setName] = React.useState({ firstName: "", lastName: "" });
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

  const [birthdayInputType, setBirthdayInputType] = React.useState("text");

  const [birthday, setBirthday] = React.useState("");
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
      { placeHolder: "Job title", name: "jobTitle" },
      { placeHolder: "Organization", name: "organization" },
      { placeHolder: "Industry", name: "industry" },
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

  function handleNameInput(e) {
    setName({ ...name, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const reqBody = {
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      birthday: data.get("birthday"),
      marital_status: data.get("maritalStatus"),
      is_employed: data.get("isEmployed"), // employed or unemployed
      is_parent: data.get("isParent"), //parent or notParent
      phone_number: data.getAll("phone"),
      son_count: data.get("isParent") !== "parent" ? 0 : data.get("sonCount"),
      daughter_count:
        data.get("isParent") !== "parent" ? 0 : data.get("daughterCount"),
      company_name: data.get("organization"),
      company_industry: data.get("industry"),
      role: data.get("jobTitle"),
      email: data.getAll("email"),
      hobby_name: data.getAll("hobby"),
      category: data.getAll("category"),
    };

    for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const createdUser = await sendRequest("POST", reqBody);

    console.log(createdUser);
    console.log("here");

    router.push(`/contact-details/${createdUser?.id}`);
  }

  if (isLoading) {
    return <div>Uploading data to db...</div>;
  }

  if (isError) {
    return <div>Unable to create user</div>;
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        "--horizontal-spacing": "20px",
        "--vertical-spacing": "20px",
        "--inner-vertical-spacing": "10px",
      }}
    >
      <NavBarForm />
      <div className={styles.avatarWrapper}>
        <InitialsAvatar
          firstName={name.firstName}
          lastName={name.lastName}
          fontSize="35px"
          circleSize="100px"
        />
      </div>
      <form
        id="new-user-form"
        className={styles.form}
        onSubmit={handleFormSubmit}
      >
        <section className={styles.nameSection}>
          <User className={styles.icon} />
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            onChange={handleNameInput}
            required={isRequired}
          ></input>
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            onChange={handleNameInput}
            className={styles.indented}
            required={isRequired}
          ></input>
        </section>

        <section className={styles.birthdaySection}>
          <Cake className={styles.icon} />
          <input
            ref={birthdayRef}
            className={styles.birthdayInput}
            name="birthday"
            placeholder="Add Birthday"
            type="text"
            onFocus={(e) => (birthdayRef.current.type = "date")}
            onMouseOver={(e) => (birthdayRef.current.type = "date")}
            onBlur={(e) => (birthdayRef.current.type = "text")}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            value={birthday}
            id="date"
            required={isRequired}
          ></input>
        </section>

        <MultiLineFormInput
          icon={Mail}
          name="email"
          type="email"
          inputs={emailList}
          setInputs={setEmailList}
          required={isRequired}
        />

        <ConditionalFormInput
          icon={Briefcase}
          name="isEmployed"
          inputs={employmentStatus}
          setInputs={setEmploymentStatus}
          config={employmentConfig}
          required={isRequired}
        />

        <ConditionalFormInput
          icon={Baby}
          name="isParent"
          inputs={parentHoodStatus}
          setInputs={setParentHoodStatus}
          config={parentHoodConfig}
          required={isRequired}
        />

        <MultiLineFormInput
          icon={Phone}
          name="phone"
          type="number"
          inputs={phoneList}
          setInputs={setPhoneList}
          required={isRequired}
        />

        <MultiLineFormInput
          icon={Gamepad2}
          name="hobby"
          inputs={hobbyList}
          setInputs={setHobbyList}
          required={isRequired}
        />

        <MultiLineFormInput
          icon={PersonStanding}
          name="category"
          inputs={categoryList}
          setInputs={setCategoryList}
          required={isRequired}
        />

        <section className={styles.maritalSection}>
          <Heart className={styles.icon} />
          <select
            name="maritalStatus"
            value={maritalStatus}
            className={styles.maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            required={isRequired}
            style={{ color: maritalStatus === "" ? "#D3D3D3" : "black" }}
          >
            <option value="" disabled>
              Add marital status
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="not applicable">Not applicable</option>
          </select>
        </section>
      </form>
    </div>
  );
}
