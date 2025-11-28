"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useState } from "react";
import EmptyboxState from "./EmptyboxState";

type Message = {
  role: string;
  content: string;
};

function ChatBox() {
  const [messsages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSend = async () => {
    if (!userInput?.trim()) return;

    setLoading(true);
    setUserInput("");

    const newMsg: Message = {
      role: "user",
      content: userInput,
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel/", {
      messages: [...messsages, newMsg],
    });
    setMessages((prev: Message[]) => [
      ...prev,
      {
        role: "assistant",
        content: result?.data?.resp,
      },
    ]);
    console.log("AI Response:", result?.data);
    setLoading(false);
  };
  return (
    <div className="flex flex-col h-[80vh] ">
      {messsages?.length == 0 && (
        <EmptyboxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}
      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messsages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>
      <div className="border border-gray-300 rounded-2xl p-4 hover:shadow-md transition-shadow relative">
        <Textarea
          placeholder="Start typing here..."
          className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          onChange={(event) => setUserInput(event.target.value ?? "")}
          value={userInput}
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
