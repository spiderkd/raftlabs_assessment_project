"use client";

import { useState } from "react";
import MenuTable from "@/components/admin/MenuTable";
import OrdersTable from "@/components/admin/OrdersTable";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 -left-40 w-100 h-100 bg-[#c6a96b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 space-y-16">
        {/* ================= HEADER ================= */}
        <header className="space-y-6">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c6a96b]">
            Control Panel
          </p>

          <h1 className="text-5xl font-light tracking-tight">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 max-w-2xl">
            Manage menu items, monitor incoming orders, and oversee operations
            with precision and control.
          </p>
        </header>

        {/* ================= TABS ================= */}
        <div className="flex space-x-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("menu")}
            className={`text-sm tracking-wide transition ${
              activeTab === "menu"
                ? "text-[#c6a96b] border-b-2 border-[#c6a96b] pb-2"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Menu Management
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`text-sm tracking-wide transition ${
              activeTab === "orders"
                ? "text-[#c6a96b] border-b-2 border-[#c6a96b] pb-2"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Recent Orders
          </button>
        </div>

        {/* ================= TAB CONTENT ================= */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-10">
          {activeTab === "menu" && (
            <>
              <h2 className="text-xl font-light tracking-wide mb-8">
                Menu Management
              </h2>
              <MenuTable />
            </>
          )}

          {activeTab === "orders" && (
            <>
              <h2 className="text-xl font-light tracking-wide mb-8">
                Recent Orders
              </h2>
              <OrdersTable />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
