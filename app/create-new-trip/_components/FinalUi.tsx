import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FinalUiProps {
  onViewTrip: () => void;
  isGenerating?: boolean;
}

function FinalUi({ onViewTrip, isGenerating = false }: FinalUiProps) {
  return (
    <div className="mt-6 p-8 border rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-center">
      <h2 className="text-2xl font-bold mb-4">Thank you! 🎉</h2>
      <p className="text-lg text-gray-700 mb-6">
        I'm now preparing your personalized trip plan based on all your preferences.
      </p>

      {isGenerating ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Planning your amazing trip...</p>
        </div>
      ) : (
        <Button onClick={onViewTrip} size="lg" className="px-10 py-6 text-lg">
          View My Trip
        </Button>
      )}
    </div>
  );
}

export default FinalUi;