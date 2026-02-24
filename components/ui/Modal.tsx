"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-3xl
                   bg-[#141414] border border-white/5
                   shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                   animate-fadeIn"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between
                        border-b border-white/10
                        px-8 py-6"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#c6a96b]">
              Administration
            </p>

            <h2 className="text-xl font-light tracking-wide text-white mt-2">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full flex items-center justify-center
                       border border-white/10 text-gray-400
                       hover:border-[#c6a96b] hover:text-[#c6a96b]
                       transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-8 py-8">{children}</div>
      </div>
    </div>
  );
}
