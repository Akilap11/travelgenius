"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyboxState from "./EmptyboxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";      
import FinalUi from "./FinalUi";                 

type Message = {
  role: string;
  content: string;
  ui?: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetail, setTripDetail] = useState<any>(null);
  const [showFinalGenerating, setShowFinalGenerating] = useState<boolean>(false);

  const onSend = async () => {
    if (!userInput?.trim() && !isFinal) return;

    setLoading(true);

    const newMsg: Message = {
      role: "user",
      content: userInput || "Ok, Great!",
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);
    setUserInput("");

    try {
      const result = await axios.post("/api/aimodel/", {
        messages: [...messages, newMsg],
        isFinal,
      });

      console.log("AI Response:", result?.data);

      if (!isFinal) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            role: "assistant",
            content: result?.data?.resp || "",
            ui: result?.data?.ui,
          },
        ]);
      } else {
        setTripDetail(result?.data.trip_plan);
        setShowFinalGenerating(true);
        setTimeout(() => {
          setShowFinalGenerating(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui === "budget") {
      return (
        <BudgetUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "groupSize") {
      return (
        <GroupSizeUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "days") {
      return (
        <SelectDaysUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "final") {
      return (
        <FinalUi
          isGenerating={showFinalGenerating}
          onViewTrip={() => {
            console.log("View trip clicked", tripDetail);
          }}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final" && !isFinal) {
      setIsFinal(true);
      setUserInput("Ok, Great!");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal, userInput]);

  return (
    <div className="flex flex-col h-[80vh]">
      {messages?.length === 0 && (
        <EmptyboxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}

      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role === "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
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

      {/* Input Area */}
      {!isFinal && (
        <div className="border border-gray-300 rounded-2xl p-4 hover:shadow-md transition-shadow relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value ?? "")}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            size={"icon"}
            className="absolute right-6 bottom-6"
            onClick={onSend}
            disabled={loading || !userInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ChatBox;