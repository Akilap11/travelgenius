"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

const TRIP_DATA = {
  destination: "Paris, France",
  origin: "Colombo, Sri Lanka",
  duration: "5 days",
  budget: "$1500",
  group_size: "2 people",
  hotels: [
    {
      hotel_name: "Hotel Le Meurice",
      hotel_address: "228 Rue de Rivoli, Paris",
      price_per_night: "$320",
      hotel_image_url: "https://example.com/hotel.jpg",
      geo_coordinates: {
        latitude: 48.8656,
        longitude: 2.3285,
      },
      rating: 4.7,
      description: "Luxury hotel near the Louvre.",
    },
    {
      hotel_name: "Hotel de Crillon",
      hotel_address: "10 Place de la Concorde, Paris",
      price_per_night: "$350",
      hotel_image_url: "https://example.com/hotel2.jpg",
      geo_coordinates: {
        latitude: 48.8698,
        longitude: 2.3215,
      },
      rating: 4.8,
      description: "Historic hotel with elegant rooms.",
    },
  ],
  itinerary: [
    {
      day: 1,
      day_plan: "Explore historic Paris",
      best_time_to_visit_day: "Morning to Evening",
      activities: [
        {
          place_name: "Eiffel Tower",
          place_details: "Iconic landmark of Paris.",
          place_image_url: "https://example.com/eiffel.jpg",
          geo_coordinates: {
            latitude: 48.8584,
            longitude: 2.2945,
          },
          place_address: "Champ de Mars, Paris",
          ticket_pricing: "€25",
          time_travel_each_location: "30 mins from hotel",
          best_time_to_visit: "Morning",
        },
        {
          place_name: "Louvre Museum",
          place_details: "World's largest art museum.",
          place_image_url: "https://example.com/louvre.jpg",
          geo_coordinates: {
            latitude: 48.8606,
            longitude: 2.3376,
          },
          place_address: "Rue de Rivoli, Paris",
          ticket_pricing: "€17",
          time_travel_each_location: "15 mins from Eiffel Tower",
          best_time_to_visit: "Afternoon",
        },
      ],
    },
    {
      day: 2,
      day_plan: "Discover Parisian culture",
      best_time_to_visit_day: "Morning to Evening",
      activities: [
        {
          place_name: "Montmartre",
          place_details: "Bohemian neighborhood with art and culture.",
          place_image_url: "https://example.com/montmartre.jpg",
          geo_coordinates: {
            latitude: 48.8867,
            longitude: 2.3431,
          },
          place_address: "Montmartre, Paris",
          ticket_pricing: "Free",
          time_travel_each_location: "20 mins from hotel",
          best_time_to_visit: "Morning",
        },
        {
          place_name: "Notre-Dame Cathedral",
          place_details: "Gothic masterpiece and historic site.",
          place_image_url: "https://example.com/notredame.jpg",
          geo_coordinates: {
            latitude: 48.8529,
            longitude: 2.35,
          },
          place_address: "6 Parvis Notre-Dame, Paris",
          ticket_pricing: "Free",
          time_travel_each_location: "15 mins from Montmartre",
          best_time_to_visit: "Afternoon",
        },
      ],
    },
  ],
};

function Itinerary() {
  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div>
          {TRIP_DATA?.hotels.map((hotel, index) => (
            <div key={index}>
              <Image
                src={"/images/paris.jpg"}
                alt="place-image"
                width={400}
                height={200}
                className="rounded-lg mb-4"
              />
            </div>
          ))}
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full h-[80vh] overflow-auto">
      <Timeline data={data} tripData={TRIP_DATA} />
    </div>
  );
}

export default Itinerary;
