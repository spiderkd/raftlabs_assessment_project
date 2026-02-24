import Link from "next/link";
import MenuItemCard from "@/components/menu/MenuItemCard";

async function getMenu() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const res = await fetch(`${baseUrl}/api/FeaturedMenu`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Page() {
  const items = await getMenu();

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white scroll-smooth">
      {/* ================= HERO ================= */}
      <section className="relative border-b border-white/10 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] via-[#0f0f0f] to-black" />

        {/* Soft Gold Glow Accent */}
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-[#c6a96b]/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 text-center space-y-10">
          <p className="tracking-[0.4em] text-sm text-[#c6a96b] uppercase">
            Fine Dining • Delivered
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
            Culinary Excellence,
            <br />
            <span className="text-[#c6a96b]">At Your Doorstep</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Experience handcrafted dishes prepared with precision and delivered
            with elegance. A refined dining experience, reimagined for your
            home.
          </p>

          <Link
            href="#menu"
            className="inline-flex items-center justify-center
                       px-12 py-4
                       border border-[#c6a96b]
                       text-[#c6a96b]
                       rounded-full
                       text-sm tracking-wider
                       hover:bg-[#c6a96b]
                       hover:text-black
                       hover:shadow-[0_0_40px_rgba(198,169,107,0.4)]
                       transition-all duration-300"
          >
            Explore The Menu
          </Link>
        </div>
      </section>

      {/* ================= MENU SECTION ================= */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-6">
          <p className="tracking-[0.3em] text-sm text-[#c6a96b] uppercase">
            Our Selection
          </p>

          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Signature Creations
          </h2>

          <div className="w-24 h-px bg-[#c6a96b] mx-auto" />

          <p className="text-gray-400 max-w-xl mx-auto">
            A curated selection of our most celebrated dishes, crafted for an
            unforgettable experience.
          </p>

          <p className="text-sm text-gray-500">
            {items.length} dishes available
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="border border-white/10 rounded-3xl p-12 text-center bg-[#151515] shadow-lg">
            <p className="text-gray-400 text-lg">
              No dishes available yet. Please add from admin dashboard.
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="group bg-[#151515]
                         border border-white/5
                         rounded-3xl
                         hover:border-[#c6a96b]/50
                         hover:-translate-y-2
                         hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                         transition-all duration-500"
            >
              <MenuItemCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
