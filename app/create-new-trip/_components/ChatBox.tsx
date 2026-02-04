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
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from 'uuid';

type Message = {
  role: string;
  content: string;
  ui?: string;
};

type TripInfo = {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels: any[];
  itinerary: any[];
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetail, setTripDetail] = useState<TripInfo | null>(null);
  const [showFinalGenerating, setShowFinalGenerating] = useState<boolean>(false);
  const SaveTripDetail = useMutation((api as any).tripDetail?.CreateTripDetail);

  const userDetailObj = useUserDetail();
  const userId = userDetailObj?.id ?? null;

  const onSend = async () => {
    if (!userInput?.trim() && !isFinal) return;

    setLoading(true);

    const newMsg: Message = {
      role: "user",
      content: userInput || "Ok, Great!",
    };

    setMessages((prev) => [...prev, newMsg]);
    setUserInput("");

    try {
      const result = await axios.post("/api/aimodel/", {
        messages: [...messages, newMsg],
        isFinal,
      });

      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: result?.data?.resp || "",
            ui: result?.data?.ui,
          },
        ]);
      }

      if (isFinal && result?.data?.trip_plan) {
        setTripDetail(result.data.trip_plan);
        const tripId = uuidv4();
        await SaveTripDetail({
          tripDetail: result.data.trip_plan,
          tripId,
          uid: userId,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const QuestionUiMap: { [question: string]: "budget" | "groupSize" | "days" | null } = {
    "Where will you be starting your trip from?": null,
    "Where are you going?": null,
    "Select your group size": "groupSize",
    "Select your budget": "budget",
    "Trip duration in days?": "days",
  };

  const RenderGenerativeUi = (msg: Message) => {
    const uiType = QuestionUiMap[msg.content] ?? msg.ui;

    switch (uiType) {
      case "budget":
        return <BudgetUi onSelectedOption={(v: React.SetStateAction<string>) => { setUserInput(v); onSend(); }} />;
      case "groupSize":
        return <GroupSizeUi onSelectedOption={(v: React.SetStateAction<string>) => { setUserInput(v); onSend(); }} />;
      case "days":
        return <SelectDaysUi onSelectedOption={(v: React.SetStateAction<string>) => { setUserInput(v); onSend(); }} />;
      case "final":
        return <FinalUi isGenerating={showFinalGenerating} onViewTrip={() => console.log(tripDetail)} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final" && !isFinal) {
      setIsFinal(true);
      setUserInput("Ok, Great!");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) onSend();
  }, [isFinal, userInput]);

  return (
    <div className="flex flex-col h-[80vh]">
      {messages.length === 0 && (
        <EmptyboxState onSelectOption={(v: React.SetStateAction<string>) => { setUserInput(v); onSend(); }} />
      )}

      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">{msg.content}</div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg)}
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

      {!isFinal && (
        <div className="border border-gray-300 rounded-2xl p-4 hover:shadow-md transition-shadow relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(e) => setUserInput(e.target.value ?? "")}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); }
            }}
          />
          <Button
            size="icon"
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
