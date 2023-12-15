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
} from "lucide-react";

import NavBarForm from "@/components/NavBarForm";
import InitialsAvatarEdit from "@/components/EditContactForm/InitialsAvatarEdit";
import { useHttp } from "@/hooks/useHttp";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import MultiLineField from "@/components/EditContactForm/MultiLineField";
import DropDownFieldInput from "@/components/EditContactForm/DropDownFieldInput";
import BirthdayFieldInput from "@/components/EditContactForm/BirthdayFieldInput";
import NameProvider from "@/components/EditContactForm/NameProvider";
import NameFieldInput from "@/components/EditContactForm/NameFieldInput";
import ConditionalEmploymentField from "@/components/EditContactForm/ConditionalEmploymentField";
import ConditionalParentField from "@/components/EditContactForm/ConditionalParentField";
import { BACKEND_URL } from "@/app/constants";
export default function Page() {
  const isRequired = true;
  const router = useRouter();
  const { id } = useParams();

  const {
    isError: isUpdateError,
    isPending: isUpdatePending,
    isLoading: isUpdateLoading,
    sendRequest,
  } = useHttp(`${BACKEND_URL}/api/contacts/${id}`);

  const { isLoading, user, isError } = useUser(id);
  const [fetchedUser, setFetchedUser] = React.useState({});

  React.useEffect(() => {
    setFetchedUser(user);
  }, [user]);

  console.log(user);

  // const [name, setName] = React.useState({ firstName: "", lastName: "" });

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
    // for (const pair of data.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    console.log(reqBody);
    const createdUser = await sendRequest("PUT", reqBody);

    console.log("here");
    console.log(createdUser);

    const { id } = createdUser;
    router.push(`/contact-details/${createdUser.id}`);
  }
  if (isError) {
    return <div>Unable to load user</div>;
  }
  if (
    isLoading ||
    !fetchedUser ||
    !user ||
    isUpdateLoading ||
    isUpdatePending
  ) {
    return <div>Loading....</div>;
  }

  if (isUpdateError) {
    return <div>Unable to update contact</div>;
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
      <form
        id="new-user-form"
        className={styles.form}
        onSubmit={handleFormSubmit}
      >
        <NameProvider
          fetchedName={{
            firstName: user.first_name,
            lastName: user.last_name,
          }}
        >
          <div className={styles.avatarWrapper}>
            <InitialsAvatarEdit fontSize="35px" circleSize="100px" />
          </div>
          <NameFieldInput
            icon={User}
            fetchedData={{
              first_name: user.first_name,
              last_name: user.last_name,
            }}
            required={isRequired}
          />
        </NameProvider>
        <BirthdayFieldInput
          icon={Cake}
          required={isRequired}
          fetchedData={fetchedUser.birthday}
          // description={'Birthday | dd/mm/yyyy'}
        />
        <MultiLineField
          icon={Mail}
          name="email"
          type="email"
          fetchedData={fetchedUser.emails}
          inputName="email_address"
          required={isRequired}
          // description={""}
        />
        <ConditionalEmploymentField
          icon={Briefcase}
          name="isEmployed"
          fetchedData={{
            ...fetchedUser.employment_detail,
            employmentStatus: fetchedUser.is_employed,
          }}
          required={isRequired}
          // description={""}
        />
        <ConditionalParentField
          icon={Baby}
          name="isParent"
          fetchedData={{
            ...fetchedUser.parenthood_detail,
            parentStatus: fetchedUser.is_parent,
          }}
          isRequired={isRequired}
        />
        <MultiLineField
          icon={Phone}
          name="phone"
          type="number"
          fetchedData={fetchedUser.contact_phone_numbers}
          inputName="phone_number"
          required={isRequired}
          // description={""}
        />
        <MultiLineField
          icon={Gamepad2}
          name="hobby"
          type="text"
          fetchedData={fetchedUser.hobbies}
          inputName="hobby_name"
          required={isRequired}
          // description={"Hobby"}
        />
        <MultiLineField
          icon={PersonStanding}
          name="category"
          type="text"
          fetchedData={fetchedUser.categories}
          inputName="category_name"
          required={isRequired}
          // description={"Contact category"}
        />
        <DropDownFieldInput
          icon={Heart}
          fetchedData={fetchedUser.marital_status}
          required={isRequired}
          // description={"Marital status"}
        />
      </form>
    </div>
  );
}
