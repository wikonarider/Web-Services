import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import MapChart from "./MapChart";

export default function Map({ info }) {
  const [content, setContent] = useState("hola");
  return (
    <div>
      <MapChart info={info} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}
