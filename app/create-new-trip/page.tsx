"use client";

import dynamic from "next/dynamic";
import Itinerary from './_components/Itinerary';

// Make ChatBox client-only to avoid prerender errors
const ChatBox = dynamic(() => import('./_components/ChatBox'), {
  ssr: false,
});

function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
      <div>
        <ChatBox />
      </div>
      <div className="col-span-2">
        <Itinerary />
      </div>
    </div>
  );
}

export default Page;
