"use client";

import { useEffect, useState } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch("/api/orders/all");
    setOrders(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <section className="bg-[#141414] rounded-2xl border border-white/5 p-5 md:p-10 space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[#c6a96b]">
          Operations
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-2">
          Customer Orders
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          Live overview of all recent orders
        </p>
      </div>

      {/* Orders */}
      <div className="space-y-8">
        {orders.map((order) => {
          const total = order.items.reduce(
            (sum: number, i: any) => sum + i.price * i.quantity,
            0,
          );

          const delivered = order.status === "Delivered";

          return (
            <div
              key={order.id}
              className="rounded-xl border border-white/5
                         bg-[#121212]
                         p-8 space-y-8
                         transition
                         hover:border-[#c6a96b]/40"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm tracking-widest text-[#c6a96b]">
                    ORDER #{order.id.slice(-6)}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`text-xs tracking-widest uppercase px-4 py-1 border
                    ${
                      delivered
                        ? "border-[#c6a96b] text-[#c6a96b]"
                        : "border-gray-600 text-gray-400"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="border border-white/5 rounded-lg p-5 text-sm text-gray-400 space-y-1">
                <p className="text-white font-light">{order.name}</p>
                <p>{order.phone}</p>
                <p className="text-xs text-gray-500">{order.address}</p>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />

                      <div>
                        <p className="text-sm font-light text-white">
                          {item.name}
                        </p>
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

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <p className="text-lg font-medium text-[#c6a96b]">
                  Total ₹{total}
                </p>

                <button
                  onClick={() => remove(order.id)}
                  className="text-xs tracking-widest uppercase
                             text-gray-500 hover:text-red-500
                             transition"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-500">
            No orders yet
          </div>
        )}
      </div>
    </section>
  );
}
