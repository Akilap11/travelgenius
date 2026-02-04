"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

export default function ContactUsPage() {
  return (
    <div className="mt-16 flex justify-center px-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-10 text-center">
          Have a question or feedback? We’d love to hear from you.
        </p>

        <div className="border border-gray-200 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input placeholder="Your name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              placeholder="Tell us how we can help"
              className="h-32 resize-none"
            />
          </div>

          <Button className="w-full">
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
