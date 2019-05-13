import React, { ReactNode } from "react";
import "./FormStep.css";
import { animated } from "react-spring";
import Paper from "@material-ui/core/Paper";

interface Props {
  children?: ReactNode;
  style: any;
}

const FormStep: React.FunctionComponent<Props> = ({ children, style }) => (
  <animated.div style={style}>
    <Paper>{children}</Paper>
  </animated.div>
);

export default FormStep;
