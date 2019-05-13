import React from "react";
import { EntryType } from "src/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "../FormStep";
import FormField from "../FormField";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import { InputPropsObject } from "src/hooks/useForm/useForm";

export const OrganisationAddress = ({
  style,
  inputs
}: {
  style: any;
  inputs: InputPropsObject<EntryType>;
}) => (
  <FormStep heading="Organisation address" style={style}>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.streetAddress!.id}>Address</FormLabel>
      <Input {...inputs.streetAddress} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.streetAddressTwo!.id}>
        Address line two
      </FormLabel>
      <Input {...inputs.streetAddressTwo} />
    </FormField>
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.city!.id}>City</FormLabel>
          <Input {...inputs.city} />
        </FormField>
      </Grid>
      <Grid item xs={6}>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.province!.id}>Province</FormLabel>
          <Input {...inputs.province} />
        </FormField>
      </Grid>
    </Grid>
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.zip!.id}>Zip/Postcode</FormLabel>
          <Input {...inputs.zip} />
        </FormField>
      </Grid>
      <Grid item xs={6}>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.country!.id}>Country</FormLabel>
          <Input {...inputs.country} />
        </FormField>
      </Grid>
    </Grid>
  </FormStep>
);
