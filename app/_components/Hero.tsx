"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Gift,
  Globe2,
  Landmark,
  Plane,
  Send,
} from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const suggestions = [
  {
    title: "A 5-day trip to Paris",
    description:
      "Explore the city of lights with visits to the Eiffel Tower, Louvre, and more.",
    icon: <Globe2 className="h-5 w-5 text-blue-400" />,
  },
  {
    title: "Individual trip to Japan",
    description:
      "Experience the blend of tradition and modernity in Tokyo, Kyoto, and Osaka.",
    icon: <Plane className="h-5 w-5 text-green-400" />,
  },
  {
    title: "Family trip to New York",
    description:
      "Discover iconic landmarks like Times Square, Central Park, and the Statue of Liberty.",
    icon: <Landmark className="h-5 w-5 text-orange-400" />,
  },
  {
    title: "Surprise me",
    description:
      "Let me surprise you with a unique travel experience tailored just for you.",
    icon: <Gift className="h-5 w-5 text-blue-400" />,
  },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip");
  };

  return (
    <section className="mt-20 md:mt-28 flex w-full justify-center px-4">
      <div className="w-full max-w-3xl text-center space-y-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold sm:text-3xl md:text-5xl leading-tight">
          Plan your perfect <span className="text-primary">trip</span> with AI
        </h1>

        <p className="text-gray-600 text-base sm:text-lg">
          Tell me your preferences, and I’ll create a personalized itinerary
          just for you.
        </p>

        {/* Input */}
        <div className="relative border border-gray-300 rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow">
          <Textarea
            placeholder="Create a travel plan for me"
            className="w-full h-24 sm:h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none pr-12"
          />
          <Button
            size="icon"
            className="absolute right-4 bottom-4"
            onClick={onSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full px-3 py-2 text-sm cursor-pointer transition hover:bg-primary hover:text-white"
            >
              {item.icon}
              <span className="whitespace-nowrap">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Hint */}
        <div className="flex flex-col items-center pt-4 text-sm sm:text-base">
          <div className="flex items-center gap-2 text-center">
            <span>
              Not sure where to start? Let AI inspire your next adventure.
              <strong> See how it works</strong>
            </span>
            <ArrowDown className="mt-1 animate-bounce" />
          </div>
        </div>

        {/* Video */}
        <HeroVideoDialog
          className="block dark:hidden pointer-events-none mt-6"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dummy-video"
          thumbnailSrc="https://images.unsplash.com/photo-1522199710521-72d69614c702"
        />
      </div>
    </section>
  );
}

export default Hero;
