import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  data: any;
}
const SmallResponsiveCard: React.FC<CardProps> = ({ data }) => {
  const { push } = useRouter();
  return (
    <div className="min-h-screen  flex items-center justify-center sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-grey shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-32 sm:h-48 object-cover"
          src="https://via.placeholder.com/400x200"
          alt="Card Image"
        />
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {data.title}
          </h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
          <div className="mt-4">
            <button
              className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              onClick={() => push(data.link)}
            >
              {data.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallResponsiveCard;
