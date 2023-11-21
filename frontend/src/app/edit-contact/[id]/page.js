"use client";

import React from "react";
import styles from "./edit-contact.module.css";
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
  FileQuestion,
} from "lucide-react";
// import MultiLineFormInput from "@/components/MultiLineFormInput";
import ConditionalFormInput from "@/components/ConditionalFormInput";
import NavBarForm from "@/components/NavBarForm";
import InitialsAvatar from "@/components/InitialsAvatar";
import { useHttp } from "@/hooks/useHttp";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import MultiTest from "@/components/test/MultiTest";
import ConditionalTest from "@/components/ConditionalTest";
export default function Page() {
  const isRequired = true;
  const router = useRouter();
  const { id } = useParams();

  const { isSendingError, sendRequest } = useHttp(
    "http://localhost:3000/api/contacts"
  );
  const { isLoading, user, isError } = useUser(id);
  const userBirthday = new Date(user?.birthday);
  const [month, day, year] = [
    userBirthday.getMonth(),
    userBirthday.getDate(),
    userBirthday.getFullYear(),
  ];
  const formattedDbBirthday = `${year}-${month}-${day}`;
  const [fetchedUser, setFetchedUser] = React.useState({});

  React.useEffect(() => {
    setFetchedUser(user);
  }, [user]);

  console.log(fetchedUser);

  // const [emailList, setEmailList] = React.useState([]);
  const [name, setName] = React.useState({ firstName: "", lastName: "" });
  const [maritalStatus, setMaritalStatus] = React.useState("");
  // const [phoneList, setPhoneList] = React.useState("");
  // const [hobbyList, setHobbyList] = React.useState([
  //   { id: crypto.randomUUID(), hobby: "" },
  // ]);
  const [birthday, setBirthday] = React.useState(null);
  // const [categoryList, setCategoryList] = React.useState([
  //   { id: crypto.randomUUID(), category: "" },
  // ]);
  // const [employmentStatus, setEmploymentStatus] = React.useState({
  //   status: "",
  //   organization: null,
  //   industry: null,
  //   jobTitle: null,
  // });
  // const [parentHoodStatus, setParentHoodStatus] = React.useState({
  //   status: "",
  //   daughterCount: null,
  //   sonCount: null,
  // });
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
      is_employed: data.get("isEmployed"),
      is_parent: data.get("isParent"),
      phone_number: data.getAll("phone"),
      son_count: data.get("isParent") !== "Parent" ? 0 : data.get("sonCount"),
      daughter_count:
        data.get("isParent") !== "Parent" ? 0 : data.get("daughterCount"),
      company_name: data.get("organization"),
      company_industry: data.get("industry"),
      role: data.get("jobTitle"),
      email: data.getAll("email"),
      hobby_name: data.getAll("hobby"),
      category: data.getAll("category"),
    };

    console.log(reqBody);
    // const createdUser = await sendRequest("POST", reqBody);

    // const { id } = createdUser;
    // router.push(`/contact-details/${id}`);
  }
  if (isError) {
    return <div>Unable to load user</div>;
  }
  if (isLoading || !fetchedUser || !user) {
    return <div>Loading....</div>;
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
            onChange={handleNameInput}
            required={isRequired}
            value={user.first_name || name.firstName}
          ></input>
          <input
            name="lastName"
            type="text"
            onChange={handleNameInput}
            className={styles.indented}
            required={isRequired}
            value={user.last_name || name.lastName}
          ></input>
        </section>

        <section className={styles.birthdaySection}>
          <Cake className={styles.icon} />
          <input
            name="birthday"
            type="date"
            id="date"
            required={isRequired}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            value={birthday || formattedDbBirthday}
          ></input>
        </section>

        {/* <MultiLineFormInput
          icon={Mail}
          name="email"
          type="email"
          inputs={fetchedUser.emails}
          inputName="email_address"
          setInputs={setEmailList}
          required={isRequired}
        /> */}

        <MultiTest
          icon={Mail}
          name="email"
          type="email"
          fetchedData={fetchedUser.emails}
          inputName="email_address"
          required={isRequired}
        />

        {/* <ConditionalFormInput
          icon={Briefcase}
          name="isEmployed"
          inputs={employmentStatus}
          setInputs={setEmploymentStatus}
          config={employmentConfig}
          required={isRequired}
        /> */}

        <ConditionalTest
          icon={Briefcase}
          name="isEmployed"
          fetchedData={fetchedUser.employment_detail}
          initialState={{
            status: "",
            organization: null,
            industry: null,
            jobTitle: null,
          }}
          config={employmentConfig}
          required={isRequired}
        />

        {/* <ConditionalFormInput
          icon={Baby}
          name="isParent"
          inputs={parentHoodStatus}
          setInputs={setParentHoodStatus}
          config={parentHoodConfig}
          required={isRequired}
        /> */}

        <ConditionalTest
          icon={Baby}
          name="isParent"
          fetchedData={fetchedUser.parenthood_detail}
          initialState={{
            status: "",
            daughterCount: null,
            sonCount: null,
          }}
          config={parentHoodConfig}
          required={isRequired}
        />

        {/* <MultiLineFormInput
          icon={Phone}
          name="phone"
          type="number"
          inputs={user?.contact_phone_numbers}
          inputName="phone_number"
          setInputs={setPhoneList}
          required={isRequired}
        /> */}

        <MultiTest
          icon={Phone}
          name="phone"
          type="email"
          fetchedData={fetchedUser.contact_phone_numbers}
          inputName="phone_number"
          required={isRequired}
        />
        {/* 
        <MultiLineFormInput
          icon={Gamepad2}
          name="hobby"
          inputs={hobbyList}
          setInputs={setHobbyList}
          required={isRequired}
        /> */}

        <MultiTest
          icon={Gamepad2}
          name="hobby"
          type="text"
          fetchedData={fetchedUser.hobbies}
          inputName="hobby_name"
          required={isRequired}
        />

        {/* <MultiLineFormInput
          icon={PersonStanding}
          name="category"
          inputs={categoryList}
          setInputs={setCategoryList}
          required={isRequired}
        /> */}

        <MultiTest
          icon={PersonStanding}
          name="category"
          type="text"
          fetchedData={fetchedUser.categories}
          inputName="category_name"
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
            style={{ color: maritalStatus === "" ? "grey" : "black" }}
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
