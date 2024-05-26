import React from "react";
import InputText from "./input-text";
import NumericInput from "./input-number";

function DynamicStructure({ type, check, ...props }) {
  switch (type) {
    case "text":
      return <InputText {...props} />;
    case "number":
      return <NumericInput {...props} />;
    default:
      return null;
  }
}

export default React.memo(DynamicStructure);
