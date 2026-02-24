"use client";

import { useEffect, useState } from "react";

const categories = [
  "STARTER",
  "MAIN_COURSE",
  "SEAFOOD",
  "PASTA",
  "SALAD",
  "DESSERT",
  "BEVERAGE",
];

const emptyState = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: "",
  category: "STARTER",
  isFeatured: false,
};

export default function MenuForm({
  editingItem,
  onDone,
}: {
  editingItem?: any;
  onDone?: () => void;
}) {
  const [form, setForm] = useState(emptyState);
  const isEditing = Boolean(editingItem);

  useEffect(() => {
    if (editingItem) {
      setForm({
        id: editingItem.id,
        name: editingItem.name,
        description: editingItem.description,
        price: String(editingItem.price),
        image: editingItem.image,
        category: editingItem.category,
        isFeatured: editingItem.isFeatured,
      });
    }
  }, [editingItem]);

  const submit = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image,
      category: form.category,
      isFeatured: form.isFeatured,
    };

    if (isEditing) {
      await fetch(`/api/menu/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setForm(emptyState);
    onDone?.();
  };

  return (
    <section className="bg-[#141414] rounded-3xl border border-white/5 shadow-xl p-10 text-white">
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c6a96b]">
          {isEditing ? "Modify Entry" : "New Entry"}
        </p>

        <h2 className="text-3xl font-light tracking-wide mt-3">
          {isEditing ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          {isEditing
            ? "Refine the details of this curated dish."
            : "Introduce a new signature creation to your collection."}
        </p>
      </div>

      <div className="space-y-8">
        {/* Name + Price */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Item Name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="lux-input"
            />
          </FormField>

          <FormField label="Price (₹)">
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="lux-input"
            />
          </FormField>
        </div>

        {/* Category */}
        <FormField label="Category">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="lux-input"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#141414]">
                {cat.replace("_", " ")}
              </option>
            ))}
          </select>
        </FormField>

        {/* Description */}
        <FormField label="Description">
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="lux-textarea"
          />
        </FormField>

        {/* Image */}
        <FormField label="Image URL">
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="lux-input"
          />
        </FormField>

        {form.image && (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <img
              src={form.image}
              className="h-44 w-full rounded-xl object-cover"
            />
          </div>
        )}

        {/* Featured Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
          <div>
            <p className="text-sm font-light tracking-wide text-white">
              Featured Item
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Highlight this dish in the featured collection
            </p>
          </div>

          <button
            type="button"
            onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
            className={`w-14 h-7 flex items-center rounded-full transition-all duration-300
            ${
              form.isFeatured
                ? "bg-[#c6a96b] justify-end shadow-[0_0_20px_rgba(198,169,107,0.5)]"
                : "bg-white/10 justify-start"
            }`}
          >
            <div className="h-6 w-6 bg-white rounded-full shadow-md m-0.5" />
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          className="w-full rounded-full border border-[#c6a96b] py-3.5 text-sm tracking-widest uppercase
                   text-[#c6a96b]
                   hover:bg-[#c6a96b]
                   hover:text-black
                   hover:shadow-[0_0_40px_rgba(198,169,107,0.4)]
                   transition-all duration-300"
        >
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </div>
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="text-xs tracking-[0.2em] uppercase text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}
