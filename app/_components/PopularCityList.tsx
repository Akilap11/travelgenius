"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Discover Popular Destinations
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Plan smarter, travel further.
              </span>{" "}
              Our AI travel planner creates personalized routes, discovers
              hidden gems, and helps you experience cities like a local. From
              cafes in Paris to temples in Kyoto, your perfect trip starts here.
            </p>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
              alt="Travel planning mockup"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-cover rounded-2xl"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Wander through Paris with AI-crafted routes and hidden gems.",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=100&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Kyoto, Japan",
    title: "Let AI guide you through Kyoto’s timeless beauty and culture.",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=100&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "New York City, USA",
    title: "Find your perfect day in the city that never sleeps.",
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=100&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Bali, Indonesia",
    title: "Plan serene beaches, waterfalls, and tropical adventures.",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=100&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Explore ancient history and modern charm effortlessly.",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=100&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Cape Town, South Africa",
    title: "Mountains, oceans, and vibrant streets — all in one AI plan.",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=100&w=3000&auto=format&fit=crop",
    content: <DummyContent />,
  },
];
