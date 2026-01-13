"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out AI trip planning",
    features: [
      "Basic itinerary generation",
      "Limited destinations",
      "Standard response speed",
    ],
  },
  {
    name: "Pro",
    price: "$9 / month",
    description: "For frequent travelers",
    features: [
      "Unlimited itineraries",
      "Smart recommendations",
      "Priority response speed",
      "Save and edit trips",
    ],
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29 / month",
    description: "For families or travel groups",
    features: [
      "Everything in Pro",
      "Group trip planning",
      "Shared itineraries",
      "Premium support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mt-24 flex justify-center px-6">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-gray-600 mb-12">
          Simple pricing. No hidden fees.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-2xl p-6 text-left ${
                plan.highlighted
                  ? "border-primary shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-gray-500 mb-4">{plan.description}</p>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
