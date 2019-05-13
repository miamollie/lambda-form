import useForm from "../../../src/hooks/useForm";

import React, { useState } from "react";
import uuid from "uuid/v4";
import axios from "axios";
import { API_BASE_URL } from "../../../src/config";
import { EntryType } from "../../../src/types";
import { withRouter } from "react-router-dom";
import { RouterProps } from "react-router";
import { useTransition } from "react-spring";

import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "./FormStep";
import FormField from "./FormField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function EntryForm({ history }: RouterProps) {
  const [values, inputs] = useForm<EntryType>({
    email: "",
    phoneNumber: "",
    website: "",
    applicantName: "",
    organisationName: "",
    role: "",
    streetAddress: "",
    streetAddressTwo: "",
    city: "",
    province: "",
    zip: "",
    country: "",
    foundationYear: "",
    registrationStatus: false,
    taxId: "",
    localisation: "local",
    hasParentAffiliation: false,
    sector: "animal_welfare",
    socialMediaHandle: "",
    socialMediaFollowers: "",
    description: "",
    priorUse: false,
    contestType: "logo",
    deadline: "",
    specificEvent: false,
    howDidYouHear: "blog",
    featureAgreement: true,
    collectEmailAgreement: true,
    privacyAgreement: true
  });
  const [step, setCurrentStep] = useState(0);
  const transitions = useTransition(step, p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" }
  });
  function onSubmit() {
    const id = uuid();
    axios
      .put(`${API_BASE_URL}/entry/${id}`, { ...values, id }) //TODO SEND A SUCCESS EMAIL WITH THE FORM CONTENT!
      .then(() => history.push("/thank-you"))
      .catch(() => window.alert("oh noes there was an error"));
  }
  function goForward() {
    setCurrentStep(step + 1);
  }
  function goBack() {
    setCurrentStep(step - 1);
  }

  const steps = [
    ({ style }: any) => (
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
          <FormLabel htmlFor={inputs.foundationYear!.id}>
            Year founded
          </FormLabel>
          <Input {...inputs.foundationYear} />
        </FormField>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.description!.id}>
            Please provide a brief description of the organization's activity.
            (A sentence or two will suffice!)
          </FormLabel>
          <Input required {...inputs.description} />
        </FormField>
      </FormStep>
    ),
    ({ style }: any) => (
      <FormStep heading="Organisation details" style={style}>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.taxId!.id}>
            Organization's tax or other ID number (for verification purposes
            only):
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
            Is the organization registered as a charitable (non-profit, NGO,
            third sector, NPO, etc.) organization by the appropriate authorities
            in your country?
          </FormLabel>
          <Checkbox
            color="secondary"
            checked={inputs.registrationStatus!.value}
            {...inputs.registrationStatus}
          />
        </FormField>
        <FormField variation="row">
          <FormLabel htmlFor={inputs.hasParentAffiliation!.id}>
            The organization is a member/chapter of a larger parent
            organization: *
          </FormLabel>
          <Checkbox
            color="secondary"
            checked={inputs.hasParentAffiliation!.value}
            {...inputs.hasParentAffiliation}
          />
        </FormField>
      </FormStep>
    ),
    ({ style }: any) => (
      <FormStep heading="Organisation media" style={style}>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.website!.id}>
            Organisation Website
          </FormLabel>
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
    ),
    ({ style }: any) => (
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
    ),
    ({ style }: any) => (
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
    ),
    ({ style }: any) => (
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
    ),
    ({ style }: any) => (
      <FormStep heading="Final details" style={style}>
        <FormField variation="row">
          <FormLabel htmlFor={inputs.priorUse!.id}>
            Have you ever used 99designs before?
          </FormLabel>
          <Checkbox
            color="secondary"
            checked={inputs.priorUse!.value}
            {...inputs.priorUse}
          />
        </FormField>
        <FormField variation="column">
          <FormLabel htmlFor={inputs.howDidYouHear!.id}>
            How did you hear about 99designs?
          </FormLabel>
          <Input {...inputs.howDidYouHear} />
        </FormField>
        <FormField variation="row">
          <FormLabel htmlFor={inputs.featureAgreement!.id}>
            If you're selected, do you consent to having your charity featured
            etc?
          </FormLabel>
          <Checkbox
            color="secondary"
            checked={inputs.featureAgreement!.value}
            {...inputs.featureAgreement}
          />
        </FormField>
        <FormField variation="row">
          <FormLabel htmlFor={inputs.collectEmailAgreement!.id}>
            Can we send you some cool emails?
          </FormLabel>
          <Checkbox
            color="secondary"
            checked={inputs.collectEmailAgreement!.value}
            {...inputs.collectEmailAgreement}
          />
        </FormField>
        <FormField variation="row">
          <FormLabel htmlFor={inputs.privacyAgreement!.id}>
            Do you understand that by submitting this form you consent to our
            privacy policy?
          </FormLabel>
          <Checkbox
            color="secondary"
            checked={inputs.privacyAgreement!.value}
            {...inputs.privacyAgreement}
          />
        </FormField>
        <Button onClick={onSubmit}>Submit!</Button>
      </FormStep>
    )
  ];

  return (
    <form style={{ position: "relative", top: "50px" }}>
      {transitions.map(({ item, props, key }) => {
        const Step = steps[item];
        return <Step key={key} style={props} />;
      })}

      <MobileStepper
        position="bottom"
        activeStep={step}
        steps={steps.length}
        variant="progress"
        nextButton={
          <Button
            size="small"
            onClick={goForward}
            disabled={step === steps.length}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={goBack} disabled={step === 0}>
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </form>
  );
}

export default withRouter(EntryForm);
