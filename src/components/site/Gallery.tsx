import macarons from "@/assets/macarons.jpg";
import croissants from "@/assets/croissants.jpg";
import tart from "@/assets/tart.jpg";
import eclair from "@/assets/eclair.jpg";
import cake from "@/assets/cake.jpg";
import interior from "@/assets/bakery-interior.jpg";

const images = [
  { src: macarons, alt: "Stack of pastel macarons", className: "sm:col-span-1 sm:row-span-2 aspect-[3/4] sm:aspect-auto" },
  { src: croissants, alt: "Butter croissants", className: "aspect-square" },
  { src: tart, alt: "Berry tartlet", className: "aspect-square" },
  { src: interior, alt: "Bakery interior", className: "sm:col-span-2 aspect-[2/1]" },
  { src: eclair, alt: "Chocolate éclair", className: "aspect-square" },
  { src: cake, alt: "Strawberry fraisier", className: "aspect-square" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-script text-3xl text-caramel">Gallery</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-primary">A palette of little masterpieces</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto">
          {images.map((img) => (
            <div
              key={img.alt}
              className={`group relative overflow-hidden rounded-3xl shadow-card hover:shadow-glow transition-all duration-500 ${img.className}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
