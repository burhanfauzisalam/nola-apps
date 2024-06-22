import React from "react";
import ButtonSwitch from "./ButtonSwitch";

const SwitchToTeacher = () => {
  const role = "Teacher / Parent";
  const url = "/login";
  return <ButtonSwitch data={{ role, url }} />;
};

export default SwitchToTeacher;
