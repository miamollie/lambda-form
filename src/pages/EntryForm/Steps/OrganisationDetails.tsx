import React from "react";
import { EntryType } from "src/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "../FormStep";
import FormField from "../FormField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import { InputPropsObject } from "src/hooks/useForm/useForm";

export const OrganisationDetails = ({
  style,
  inputs
}: {
  style: any;
  inputs: InputPropsObject<EntryType>;
}) => (
  <FormStep heading="Organisation details" style={style}>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.taxId!.id}>
        Organization's tax or other ID number (for verification purposes only):
      </FormLabel>
      <Input {...inputs.taxId} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.localisation!.id}>Localisation</FormLabel>
      <Select {...inputs.localisation}>
        <MenuItem value="test">test</MenuItem>
      </Select>
    </FormField>
    <FormField variation="row">
      <FormLabel htmlFor={inputs.registrationStatus!.id}>
        Is the organization registered as a charitable (non-profit, NGO, third
        sector, NPO, etc.) organization by the appropriate authorities in your
        country?
      </FormLabel>
      <Checkbox
        color="secondary"
        checked={inputs.registrationStatus!.value}
        {...inputs.registrationStatus}
      />
    </FormField>
    <FormField variation="row">
      <FormLabel htmlFor={inputs.hasParentAffiliation!.id}>
        The organization is a member/chapter of a larger parent organization: *
      </FormLabel>
      <Checkbox
        color="secondary"
        checked={inputs.hasParentAffiliation!.value}
        {...inputs.hasParentAffiliation}
      />
    </FormField>
  </FormStep>
);
