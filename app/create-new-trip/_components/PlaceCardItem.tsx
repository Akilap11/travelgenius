import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLinkIcon, Ticket } from "lucide-react";

function PlaceCardItem({ activity, idx }: any) {
  return (
    <div key={idx} className="">
      <div className="">
        <Image
          src={"/images/paris.jpg"}
          alt={activity?.place_name}
          width={400}
          height={200}
          className="rounded-xl shadow object-cover"
        />
        <h2 className="text-lg font-semibold">{activity?.place_name}</h2>
        <p className="text-gray-500 line-clamp-2">{activity?.place_details}</p>
        <h2 className="flex gap-2 text-blue-500 line-clamp-1">
          {" "}
          <Ticket /> {activity?.ticket_pricing}
        </h2>
        <p className="flex gap-2 text-orange-400 line-clamp-1">
          <Clock /> {activity?.best_time_to_visit}
        </p>
        <Link
          href={
            "https://www.google.com/maps/search/?api=1&query=$" +
            activity?.place_name
          }
          target="_blank"
        >
          <Button variant={"outline"} className="mt-2 w-full">
            View
            <ExternalLinkIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
