import React from "react";
import { EntryType } from "src/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "../FormStep";
import FormField from "../FormField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { InputPropsObject } from "src/hooks/useForm/useForm";

export const OrganisationOverview = ({
  style,
  inputs
}: {
  style: any;
  inputs: InputPropsObject<EntryType>;
}) => (
  <FormStep heading="Your organisation" style={style}>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.organisationName!.id}>
        Organisation Name
      </FormLabel>
      <Input required {...inputs.organisationName} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.sector!.id}>Sector</FormLabel>
      <Select required {...inputs.sector}>
        <MenuItem value="test">test</MenuItem>
      </Select>
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.foundationYear!.id}>Year founded</FormLabel>
      <Input {...inputs.foundationYear} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.description!.id}>
        Please provide a brief description of the organization's activity. (A
        sentence or two will suffice!)
      </FormLabel>
      <Input required {...inputs.description} />
    </FormField>
  </FormStep>
);
