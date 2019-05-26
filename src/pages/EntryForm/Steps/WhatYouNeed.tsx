import React from "react";
import { EntryType } from "src/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "../FormStep";
import FormField from "../FormField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { InputPropsObject } from "src/hooks/useForm/useForm";

export const WhatYouNeed = ({
  style,
  inputs
}: {
  style: any;
  inputs: InputPropsObject<EntryType>;
}) => (
  <FormStep heading="How can we help?" style={style}>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.contestType!.id}>
        What kind of contest would you like to run?
      </FormLabel>
      <Select {...inputs.contestType}>
        <MenuItem value="test">test</MenuItem>
      </Select>
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.specificEvent!.id}>
        Do you want to use 99 for a specific event?
      </FormLabel>
      <Input {...inputs.specificEvent} />
    </FormField>
    <FormField variation="column">
      <FormLabel htmlFor={inputs.deadline!.id}>
        Do you have a deadline?
      </FormLabel>
      {/* TODO date picker */}
      <Input {...inputs.deadline} />
    </FormField>
  </FormStep>
);
