import MenuTabs from "@/components/menu/MenuTabs";

async function getMenu() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const res = await fetch(`${baseUrl}/api/menu`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Page() {
  const items = await getMenu();

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* ================= HERO ================= */}
      <section className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] via-[#0f0f0f] to-black" />
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-[#c6a96b]/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 text-center space-y-8">
          <p className="tracking-[0.4em] text-sm text-[#c6a96b] uppercase">
            The Full Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
            Our Complete
            <br />
            <span className="text-[#c6a96b]">Culinary Menu</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Explore our curated selection of refined dishes, crafted with
            precision and timeless culinary artistry.
          </p>
        </div>
      </section>

      {/* ================= MENU ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <MenuTabs items={items} />
      </section>
    </main>
  );
}
