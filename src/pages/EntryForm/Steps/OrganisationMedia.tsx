import React from "react";
import { EntryType } from "src/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "../FormStep";
import FormField from "../FormField";
import Input from "@material-ui/core/Input";
import { InputPropsObject } from "src/hooks/useForm/useForm";

export const OrganisationMedia = ({
  style,
  inputs
}: {
  style: any;
  inputs: InputPropsObject<EntryType>;
}) => (
  <FormStep heading="Organisation media" style={style}>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.website!.id}>Organisation Website</FormLabel>
      <Input required {...inputs.website} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.socialMediaHandle!.id}>
        Social media handle
      </FormLabel>
      <Input {...inputs.socialMediaHandle} />
    </FormField>
    <FormField variation="column">
      <FormLabel>Social media followers</FormLabel>
      <Input {...inputs.socialMediaFollowers} />
    </FormField>
  </FormStep>
);
