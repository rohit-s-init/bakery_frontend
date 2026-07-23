import { Quote } from "lucide-react";

const quotes = [
  { name: "Amélie R.", role: "Regular customer", text: "The croissants are the closest thing to Paris I've ever found. Flaky, buttery, absolute perfection." },
  { name: "Daniel K.", role: "Food critic", text: "Pastry Palette elevates the everyday pastry into something that feels like a small ceremony." },
  { name: "Sofia M.", role: "Bride, 2025", text: "Our wedding cake was breathtaking — a true work of art. Guests are still talking about it." },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-script text-3xl text-caramel">Kind Words</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-primary">From our lovely guests</h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <figure
              key={q.name}
              className="glass rounded-3xl p-8 shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
              style={{ animation: `fade-up 0.8s ${i * 120}ms ease-out both` }}
            >
              <Quote className="text-caramel" size={28} />
              <blockquote className="mt-4 text-lg text-foreground leading-relaxed font-display italic">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold text-primary">{q.name}</div>
                <div className="text-sm text-muted-foreground">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
