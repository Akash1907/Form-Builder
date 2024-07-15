import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import VideoSwitch from "../Components/VideoSwitch/VideoSwitch";

const VideoSwitchRenderer = ({ uischema, schema, path  }) => {
  const label = schema.title || path;
  
  return (
    <div>
      <VideoSwitch label = {label} />
    </div>
  );
};

export default withJsonFormsControlProps(VideoSwitchRenderer);