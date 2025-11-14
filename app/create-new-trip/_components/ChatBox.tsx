"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React from "react";

function ChatBox() {
  const onSend = () => {
    
  };
  return (
    <div className="flex flex-col h-[80vh] ">
      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-end mt-2">
          <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
            Hello! How can I assist you with your trip planning today?
          </div>
        </div>

        <div className="flex justify-start mt-2">
          <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
            AI suggests visiting the Eiffel Tower in Paris.
          </div>
        </div>
      </section>
      <div className="border border-gray-300 rounded-2xl p-4 hover:shadow-md transition-shadow relative">
        <Textarea
          placeholder="Create a travel plan for me"
          className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
        />
        <Button
          size={"icon"}
          className="absolute right-6 bottom-6"
          onClick={onSend}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <section></section>
    </div>
  );
}

export default ChatBox;
