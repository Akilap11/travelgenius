'use client'
import React, { useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";

function HotelCardItem({hotel}: {hotel: any}) {

  useEffect(() => {
    hotel && GetGooglePlaceDetail()
  }, [hotel])

  const GetGooglePlaceDetail=async () => {
    const result = await axios.post("/api/google-place-detaill", {
      placeName: hotel?.hotel_name})
      console.log(result?.data)
  }

  return (
     <div className="flex flex-col gap-1">
              <Image
                src={"/images/paris.jpg"}
                alt="place-image"
                width={400}
                height={200}
                className="rounded-2xl shadow object-cover"
              />
              <h2 className="text-lg font-semibold">{hotel?.hotel_name}</h2>
              <h2 className=" text-gray-500">{hotel?.hotel_address}</h2>
              <div className="flex justify-between items-center">
                <p className="flex gap-2 text-green-600">
                  {hotel.price_per_night}
                </p>
                <p className="flex gap-2 text-yellow-500">
                  <Star />
                  {hotel?.rating}
                </p>
              </div>
              <Link
                href={
                  "https://www.google.com/maps/search/?api=1&query=$" + hotel?.hotel_name
                }
                target="_blank"
              >
                <Button variant={"outline"} className="mt-2 w-full">
                  View
                </Button>
              </Link>

              {/* <p className="text-gray-500 line-clamp-2">{hotel?.description}</p> */}
            </div>
  )
}

export default HotelCardItem
