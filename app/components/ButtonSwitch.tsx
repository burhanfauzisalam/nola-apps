import React from "react";
import { useRouter } from "next/navigation";

interface role {
  data: any;
}
const ButtonSwitch: React.FC<role> = ({ data }) => {
  const { push } = useRouter();
  return (
    <button
      type="button"
      className="btn btn-secondary btn-block text-uppercase mb-2 rounded-pill shadow-sm ml-5"
      onClick={() => push(data.url)}
    >
      Login as {data.role}
    </button>
  );
};

export default ButtonSwitch;
