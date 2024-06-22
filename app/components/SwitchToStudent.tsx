import React from "react";
import ButtonSwitch from "./ButtonSwitch";

const SwitchToStudent = () => {
  const role = "Student";
  const url = "/login-student";
  return <ButtonSwitch data={{ role, url }} />;
};

export default SwitchToStudent;
