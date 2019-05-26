import React from "react";
import { EntryType } from "src/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "../FormStep";
import FormField from "../FormField";
import Input from "@material-ui/core/Input";
import { InputPropsObject } from "src/hooks/useForm/useForm";

export const ContactPerson = ({
  style,
  inputs
}: {
  style: any;
  inputs: InputPropsObject<EntryType>;
}) => (
  <FormStep heading="Contact person" style={style}>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.applicantName!.id}>
        Name of applicant
      </FormLabel>
      <Input {...inputs.applicantName} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.role!.id}>Role in organisation</FormLabel>
      <Input {...inputs.role} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.email!.id}>Applicant's email</FormLabel>
      <Input {...inputs.email} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.phoneNumber!.id}>
        Applicant's phone number
      </FormLabel>
      <Input {...inputs.phoneNumber} />
    </FormField>
  </FormStep>
);
