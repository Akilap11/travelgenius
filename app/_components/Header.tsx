"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const menuItems = [
  { title: "Home", path: "/" },
  { title: "Pricing", path: "/pricing" },
  { title: "Contact Us", path: "/contact-us" },
];

const Header = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={39} height={48} />
          <h2 className="font-bold text-xl md:text-2xl">
            TravelGenius - AI
          </h2>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="text-lg hover:text-primary transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:block">
          {!user ? (
            <SignInButton mode="modal">
              <Button>Get Started</Button>
            </SignInButton>
          ) : (
            <Link href="/create-new-trip">
              <Button>Create Trip</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className="text-lg"
              >
                {item.title}
              </Link>
            ))}

            <div className="pt-2">
              {!user ? (
                <SignInButton mode="modal">
                  <Button className="w-full">Get Started</Button>
                </SignInButton>
              ) : (
                <Link href="/create-new-trip">
                  <Button className="w-full">Create Trip</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
