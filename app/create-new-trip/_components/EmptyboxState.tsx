import { suggestions } from "@/app/_components/Hero";
import React from "react";

function EmptyboxState({onSelectOption}: any) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-3xl text-center">
        Start Planning Your <strong className="text-primary">Trip</strong> With
        the Help of AI
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Ask me anything about your trip and I will help you plan the perfect
        itinerary!
      </p>

      <div className="flex flex-col gap-5">
        {suggestions.map((suggestions, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(suggestions.title)}
            className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary"
          >
            {suggestions.icon}
            <h2 className="text-lg">{suggestions.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyboxState;
