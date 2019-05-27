import useForm from "../../../src/hooks/useForm";

import React, { useState } from "react";
import uuid from "uuid/v4";
import axios from "axios";
import { API_BASE_URL } from "../../../src/config";
import { EntryType } from "../../../src/types";
import { withRouter } from "react-router-dom";
import { RouterProps } from "react-router";
import { useTransition } from "react-spring";

import { OrganisationOverview } from "./Steps/OrganisationOverview";
import { OrganisationDetails } from "./Steps/OrganisationDetails";
import { OrganisationMedia } from "./Steps/OrganisationMedia";
import { OrganisationAddress } from "./Steps/OrganisationAddress";
import { ContactPerson } from "./Steps/ContactPerson";
import { FinalDetails } from "./Steps/FinalDetails";
import { WhatYouNeed } from "./Steps/WhatYouNeed";

import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  if (currentStep !== prevStep) setPrevStep(currentStep);
  const transitions = useTransition(currentStep, p => p, {
    unique: true,
    from: {
      opacity: 0,
      transform: `translate3d(${(currentStep - prevStep) * 100}%,0,0)`
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform: `translate3d(${(prevStep - currentStep) * 100}%,0,0)`
    }
  });

  function goForward() {
    setCurrentStep(currentStep + 1);
    setPrevStep(currentStep);
  }
  function goBack() {
    setCurrentStep(currentStep - 1);
    setPrevStep(currentStep);
  }
  function onSubmit() {
    const id = uuid();
    axios
      .put(`${API_BASE_URL}/entry/${id}`, { ...values, id }) //TODO SEND A SUCCESS EMAIL WITH THE FORM CONTENT!
      .then(() => history.push("/thank-you"))
      .catch(() => window.alert("oh noes there was an error"));
  }

  const steps = [
    ({ style }: any) => <OrganisationOverview style={style} inputs={inputs} />,
    ({ style }: any) => <OrganisationDetails style={style} inputs={inputs} />,
    ({ style }: any) => <OrganisationMedia style={style} inputs={inputs} />,
    ({ style }: any) => <OrganisationAddress style={style} inputs={inputs} />,
    ({ style }: any) => <ContactPerson style={style} inputs={inputs} />,
    ({ style }: any) => <WhatYouNeed style={style} inputs={inputs} />,
    ({ style }: any) => (
      <FinalDetails style={style} inputs={inputs} onSubmit={onSubmit} />
    )
  ];

  return (
    <form style={{ position: "relative" }}>
      {transitions.map(({ item, props, key }) => {
        const Step = steps[item];
        return <Step key={key} style={props} />;
      })}
      <MobileStepper
        position="bottom"
        activeStep={currentStep}
        steps={steps.length}
        variant="progress"
        nextButton={
          <Button
            size="small"
            onClick={goForward}
            disabled={currentStep === steps.length - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={goBack} disabled={currentStep === 0}>
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </form>
  );
}

export default withRouter(EntryForm);
