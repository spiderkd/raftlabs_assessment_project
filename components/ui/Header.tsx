
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Utensils,
  ClipboardList,
  Shield,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { cart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItem = (href: string, label: string, Icon: any, mobile = false) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
        className={`relative flex items-center gap-2 px-4 py-2 text-sm tracking-wide transition-all duration-300
          ${mobile ? "text-base py-3" : ""}
          ${active ? "text-[#c6a96b]" : "text-gray-400 hover:text-[#c6a96b]"}
        `}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>

        {href === "/cart" && totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 flex h-5 min-w-5
                          items-center justify-center rounded-full
                          bg-[#c6a96b] px-1.5 text-[11px]
                          font-semibold text-black shadow-lg"
          >
            {totalItems}
          </span>
        )}

        {active && !mobile && (
          <span className="absolute left-0 -bottom-1 h-px w-full bg-[#c6a96b]" />
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-light tracking-wide text-white"
          >
            <div
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full
                            border border-[#c6a96b] text-[#c6a96b] text-lg"
            >
              🍷
            </div>
            <span className="text-lg sm:text-xl tracking-wider">
              Maison Élégance
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItem("/", "Home", Home)}
            {navItem("/menu", "Menu", Utensils)}
            {navItem("/cart", "Cart", ShoppingCart)}
            {navItem("/orders", "Orders", ClipboardList)}

            <Link
              href="/admin"
              className="ml-6 px-6 py-2 text-xs tracking-widest uppercase
                         border border-[#c6a96b] text-[#c6a96b]
                         hover:bg-[#c6a96b] hover:text-black
                         transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-[#c6a96b] transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden bg-[#111111] border-t border-white/5 
           px-6 pb-6 pt-4 space-y-2
           animate-in slide-in-from-top duration-300"
        >
          {navItem("/", "Home", Home, true)}
          {navItem("/menu", "Menu", Utensils, true)}
          {navItem("/cart", "Cart", ShoppingCart, true)}
          {navItem("/orders", "Orders", ClipboardList, true)}

          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm
                       border border-[#c6a96b] text-[#c6a96b]
                       hover:bg-[#c6a96b] hover:text-black transition"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
