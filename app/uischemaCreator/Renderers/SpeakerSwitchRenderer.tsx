import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import SpeakerSwitch from "../Components/SpeakerSwitch/SpeakerSwitch";

const SpeakerSwitchRenderer = ({ uischema, schema, path  }) => {
  const label = schema.title || path;
  
  return (
    <div>
      <SpeakerSwitch label = {label} />
    </div>
  );
};

export default withJsonFormsControlProps(SpeakerSwitchRenderer);