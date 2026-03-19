'use client'

const cards = [
  {
    title: "Wisata Alam",
    img: "/bg/bg-wisata.png",
    gradient: "from-blue-500/60 to-cyan-500/60"
  },
  {
    title: "Kuliner Khas",
    img: "/bg/bg-makanan.png",
    gradient: "from-orange-500/60 to-red-500/60"
  },
  {
    title: "Budaya Keraton",
    img: "/bg/bg-keraton.png",
    gradient: "from-purple-500/60 to-indigo-600/60"
  },
  {
    title: "UMKM Lokal",
    img: "/bg/bg-umkm.png",
    gradient: "from-green-500/60 to-emerald-600/60"
  }
]

export default function Hal() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* BACKGROUND UTAMA */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/bg/bg-hal.jpg')",
          backgroundPosition: "center 100%"
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Hal Menarik di Cirebon
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Jelajahi keindahan kota dari budaya, kuliner hingga produk lokal unggulan
          </p>
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((item, i) => (
            <div
              key={i}
              className="relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden group cursor-pointer"
            >

              {/* IMAGE */}
              <img
                src={item.img}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />


              {/* TEXT */}
              <div className="absolute inset-0 p-6 flex items-start">
                <h3 className="text-white text-xl md:text-3xl font-semibold leading-snug">
                  {item.title}
                </h3>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}