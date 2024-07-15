import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import MicSwitch from "../Components/MicSwitch/MicSwitch";

const MicSwitchRenderer = ({ uischema, schema, path  }) => {
  const label = schema.title || path;
  
  return (
    <div>
      <MicSwitch label = {label} />
        
    </div>
  );
};

export default withJsonFormsControlProps(MicSwitchRenderer);