import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  variation: "row" | "column";
}

const FormField: React.FunctionComponent<Props> = ({ children, variation }) => (
  <div
    style={{
      padding: "30px",
      display: "flex",
      flexDirection: variation,
      alignItems: variation === "row" ? "center" : "normal"
    }}
  >
    {children}
  </div>
);

export default FormField;
