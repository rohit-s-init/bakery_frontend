import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useUser } from "@/context/User";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/menu", label: "Menu" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`glass flex items-center justify-between rounded-full pl-5 pr-3 sm:pl-7 sm:pr-3 py-2.5 transition-all duration-500 ${scrolled ? "shadow-soft" : ""
            }`}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-warm text-primary font-display text-lg font-bold shadow-card">
              P
            </span>
            <span className="font-display text-lg sm:text-2xl font-semibold text-primary tracking-tight whitespace-nowrap">
              Pastry Palette
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-caramel after:transition-all hover:after:w-full data-[status=active]:text-primary data-[status=active]:font-semibold data-[status=active]:after:w-full"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {user == undefined ? <>
            <Link
              to="/login"
              className="hidden lg:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:scale-105 transition-transform shadow-card"
            >
              Login
            </Link>
          </> : <>
            <Link
              to="/profile"
              className="hidden lg:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:scale-105 transition-transform shadow-card"
            >
              {user.name.charAt(0).toUpperCase()}
            </Link>
          </>}


          <button
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full bg-cream text-primary shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="lg:hidden mt-3 glass rounded-3xl p-6 shadow-soft animate-fade-up">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    className="block text-base text-foreground hover:text-caramel transition-colors data-[status=active]:text-primary data-[status=active]:font-semibold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                {user == undefined ? <>
                  <Link
                    to="/login"
                    className="hidden lg:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:scale-105 transition-transform shadow-card"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                  >
                    Register
                  </Link>
                </> : <>
                  <Link
                    to="/profile"
                    className="hidden lg:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:scale-105 transition-transform shadow-card"
                  >
                    order
                  </Link>

                </>}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
