"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderStatus() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOrder = async () => {
    const res = await fetch(`/api/orders?id=${id}`);
    if (!res.ok) return;

    const data = await res.json();
    setOrder(data);

    if (data.status === "Delivered" && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchOrder();
    intervalRef.current = setInterval(fetchOrder, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id]);

  if (!order)
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-sm text-gray-500">
        Loading order details…
      </div>
    );

  const total = order.items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0,
  );

  /* ================= PROGRESS LOGIC ================= */

  const steps = ["Preparing", "Out for Delivery", "Delivered"];

  const currentStepIndex = steps.indexOf(order.status);

  const progressPercentage =
    currentStepIndex === -1 ? 0 : ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute -top-40 -right-40 w-100 h-100 bg-[#c6a96b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 py-20 space-y-16">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c6a96b]">
              Order Tracking
            </p>

            <h1 className="text-5xl font-light tracking-tight mt-3">
              Order #{order.id.slice(-6)}
            </h1>
          </div>

          <div className="flex gap-4">
            <Link
              href="/orders"
              className="px-6 py-2 text-sm tracking-wide
                         border border-white/10 text-gray-400
                         hover:border-[#c6a96b] hover:text-[#c6a96b]
                         transition"
            >
              ← Orders
            </Link>

            <Link
              href="/"
              className="px-6 py-2 text-sm tracking-wide
                         border border-[#c6a96b] text-[#c6a96b]
                         hover:bg-[#c6a96b] hover:text-black
                         transition"
            >
              Home
            </Link>
          </div>
        </header>

        {/* ================= STATUS SECTION ================= */}
        <section className="rounded-2xl bg-[#141414] border border-white/5 p-12 space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm tracking-widest text-gray-400 uppercase">
              Current Status
            </p>

            <h2 className="text-4xl font-light tracking-wide text-[#c6a96b]">
              {order.status}
            </h2>
          </div>

          {/* ===== Progress Bar ===== */}
          <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#c6a96b] transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* ===== Step Labels ===== */}
          <div className="flex justify-between text-xs tracking-widest uppercase text-gray-500 mt-6">
            {steps.map((step, index) => {
              const isActive = index <= currentStepIndex;

              return (
                <span key={step} className={isActive ? "text-[#c6a96b]" : ""}>
                  {step === "Out for Delivery" ? "On The Way" : step}
                </span>
              );
            })}
          </div>
        </section>

        {/* ================= ITEMS ================= */}
        <section className="rounded-2xl bg-[#141414] border border-white/5 p-10 space-y-8">
          <h3 className="text-2xl font-light tracking-wide">Items Ordered</h3>

          <div className="space-y-6">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div>
                    <p className="text-sm font-light text-white">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#c6a96b]">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-white/5 pt-8">
            <p className="text-xl font-medium text-[#c6a96b]">Total ₹{total}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
