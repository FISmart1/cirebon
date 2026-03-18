'use client';

export default function AboutCirebon() {
  return (
    <section className="relative py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* VIDEO */}

        <div className="relative w-full">
          <video className="rounded-2xl shadow-xl w-full" autoPlay loop muted playsInline>
            <source src="https://res.cloudinary.com/dnzhewrrx/video/upload/v1773790482/cirebon_1_fzmcgj.mp4" type="video/mp4" />
          </video>
        </div>

        {/* TEXT */}

        <div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">Discover the Cultural Heart of Cirebon</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            <strong>Cirebon</strong> adalah kota pesisir di Jawa Barat yang dikenal sebagai persimpangan budaya Jawa, Sunda, Arab, dan Tionghoa. Kota ini memiliki warisan sejarah yang kaya, mulai dari keraton, kuliner legendaris, hingga
            batik khas seperti motif Mega Mendung.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            Selain budaya, wilayah ini juga dikelilingi keindahan alam seperti Gunung Ciremai, pantai utara Jawa, serta berbagai destinasi wisata religi dan sejarah yang menjadikannya tujuan wisata unik di Indonesia.
          </p>

        </div>
      </div>
    </section>
  );
}
