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
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => push(data.url)}
    >
      Login as {data.role}
    </button>
  );
};

export default ButtonSwitch;
