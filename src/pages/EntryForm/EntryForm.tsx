import useForm from "../../../src/hooks/useForm";

import React, { useState } from "react";
import Row from "../../components/Row";
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
import FormLabel from "@material-ui/core/FormLabel";
import FormStep from "./FormStep";

function EntryForm({ history }: RouterProps) {
  const [values, inputs] = useForm<EntryType>({
    email: "",
    phoneNumber: "",
    website: "",
    firstName: "",
    lastName: "",
    name: "",
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
    //some kind of validation
    setCurrentStep(step + 1);
  }
  function goBack() {
    //some kind of validation
    setCurrentStep(step - 1);
  }

  const steps = [
    ({ style }: any) => (
      <FormStep style={style}>
        <Row>
          <FormLabel htmlFor={inputs.name!.id}>Organisation Name</FormLabel>
          <Input required {...inputs.name} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.sector!.id}>Sector</FormLabel>
          {/* TODO dropdown? */}
          <Input required {...inputs.sector} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.website!.id}>
            Organisation Website
          </FormLabel>
          <Input required {...inputs.website} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.description!.id}>
            Please provide a brief description of the organization's activity.
            (A sentence or two will suffice!)
          </FormLabel>
          <Input required {...inputs.description} />
        </Row>
      </FormStep>
    ),
    ({ style }: any) => (
      <FormStep style={style}>
        <Row>
          <FormLabel htmlFor={inputs.foundationYear!.id}>
            Year founded
          </FormLabel>
          <Input {...inputs.foundationYear} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.socialMediaHandle!.id}>
            Social media handle
          </FormLabel>
          <Input {...inputs.socialMediaHandle} />
        </Row>
        <Row>
          <FormLabel>Social media followers</FormLabel>
          <Input {...inputs.socialMediaFollowers} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.taxId!.id}>
            Organization's tax or other ID number (for verification purposes
            only):
          </FormLabel>
          <Input {...inputs.taxId} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.localisation!.id}>Localisation</FormLabel>
          {/* TODO dropdown? */}
          <Input {...inputs.localisation} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.registrationStatus!.id}>
            Is the organization registered as a charitable (non-profit, NGO,
            third sector, NPO, etc.) organization by the appropriate authorities
            in your country?
          </FormLabel>
          <Input type="checkbox" {...inputs.registrationStatus} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.hasParentAffiliation!.id}>
            The organization is a member/chapter of a larger parent
            organization: *
          </FormLabel>

          <Input type="checkbox" {...inputs.hasParentAffiliation} />
        </Row>
      </FormStep>
    ),
    ({ style }: any) => (
      <FormStep style={style}>
        <Row>
          <FormLabel htmlFor={inputs.phoneNumber!.id}>
            Applicant's phone number
          </FormLabel>
          <Input {...inputs.phoneNumber} />
        </Row>
        <Row>
          <FormLabel>Name of applicant</FormLabel>
          <Input {...inputs.firstName} />
          <Input {...inputs.lastName} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.role!.id}>Role in organisation</FormLabel>
          <Input {...inputs.role} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.email!.id}>Applicant's email</FormLabel>
          <Input {...inputs.email} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.phoneNumber!.id}>
            Applicant's phone number
          </FormLabel>
          <Input {...inputs.phoneNumber} />
        </Row>
      </FormStep>
    ),
    ({ style }: any) => (
      <FormStep style={style}>
        <Row>
          <FormLabel htmlFor={inputs.phoneNumber!.id}>
            Applicant's phone number
          </FormLabel>
          <Input {...inputs.phoneNumber} />
        </Row>
        <Row>
          {/* TODO label for group */}
          <FormLabel>Name of applicant</FormLabel>
          <Input {...inputs.firstName} />
          <Input {...inputs.lastName} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.role!.id}>Role in organisation</FormLabel>
          <Input {...inputs.role} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.email!.id}>Applicant's email</FormLabel>
          <Input {...inputs.email} />
        </Row>
        <Row>
          <FormLabel htmlFor={inputs.phoneNumber!.id}>
            Applicant's phone number
          </FormLabel>
          <Input {...inputs.phoneNumber} />
        </Row>
        <Button onClick={onSubmit}>Submit!</Button>
      </FormStep>
    )
  ];

  return (
    <form>
      <>
        {transitions.map(({ item, props, key }) => {
          const Page = steps[item];
          return <Page key={key} style={props} />;
        })}

        <MobileStepper
          position="static"
          activeStep={step}
          steps={5}
          variant="progress"
          nextButton={
            <Button size="small" onClick={goForward} disabled={step === 5}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={goBack} disabled={step === 0}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </>
    </form>
  );
}

export default withRouter(EntryForm);
