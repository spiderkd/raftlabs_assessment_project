"use client";

import { useEffect, useState } from "react";
import MenuForm from "./MenuForm";
import Modal from "@/components/ui/Modal";

export default function MenuTable() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const res = await fetch("/api/menu");
    setItems(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    load();
  };

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setOpen(true);
  };

  return (
    <section className="bg-[#141414] rounded-2xl border border-white/5 p-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[#c6a96b]">
            Management
          </p>
          <h3 className="text-2xl font-light tracking-wide mt-2">Menu Items</h3>
        </div>

        <button
          onClick={openAdd}
          className="px-6 py-2 text-sm tracking-widest uppercase
                     border border-[#c6a96b] text-[#c6a96b]
                     hover:bg-[#c6a96b] hover:text-black
                     transition cursor-pointer"
        >
          + Add Item
        </button>
      </div>

      {/* Items */}
      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between
                       rounded-xl border border-white/5
                       bg-[#121212]
                       p-5
                       transition
                       hover:border-[#c6a96b]/40
                       hover:bg-[#161616]"
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              <img
                src={item.image}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <p className="text-white font-light tracking-wide">
                  {item.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">₹{item.price}</p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex gap-8 text-sm tracking-wide">
              <button
                onClick={() => openEdit(item)}
                className="text-gray-400 cursor-pointer hover:text-[#c6a96b] transition"
              >
                Edit
              </button>

              <button
                onClick={() => remove(item.id)}
                className="text-gray-500 cursor-pointer hover:text-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Menu Item" : "Add Menu Item"}
      >
        <MenuForm
          editingItem={editing}
          onDone={() => {
            setOpen(false);
            setEditing(null);
            load();
          }}
        />
      </Modal>
    </section>
  );
}
