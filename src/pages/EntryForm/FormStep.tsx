import React, { ReactNode } from "react";
import { animated } from "react-spring";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

interface Props {
  children?: ReactNode;
  style: any;
  heading: string;
}

const FormStep: React.FunctionComponent<Props> = ({
  children,
  style,
  heading
}) => (
  <animated.div
    style={{ ...style, position: "absolute", height: "100%", width: "100%" }}
  >
    <Paper>
      <div style={{ padding: "30px" }}>
        <Typography variant="h5" component="h3">
          {heading}
        </Typography>
        {children}
      </div>
    </Paper>
  </animated.div>
);

export default FormStep;
