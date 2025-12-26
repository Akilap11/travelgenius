import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

function SelectDaysUi({ onSelectedOption }: any) {
  const [days, setDays] = useState<number>(1);

  const handleConfirm = () => {
    onSelectedOption(`${days} day${days > 1 ? "s" : ""}`);
  };

  return (
    <div className="mt-6 p-6 border rounded-2xl bg-white">
      <h2 className="text-xl font-semibold mb-4">How many days do you want to travel?</h2>
      
      <div className="flex items-center justify-center gap-8 my-8">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setDays(Math.max(1, days - 1))}
          disabled={days <= 1}
        >
          <Minus className="h-5 w-5" />
        </Button>
        
        <div className="text-4xl font-bold tabular-nums w-24 text-center">
          {days}
        </div>
        
        <Button
          size="icon"
          variant="outline"
          onClick={() => setDays(days + 1)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={handleConfirm} size="lg" className="px-8">
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default SelectDaysUi;