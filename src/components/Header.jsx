import { Link, useLocation } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 shadow-lg backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Download className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 p-2 text-white transition-transform group-hover:rotate-12" />
              <span className="ml-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
                SaveYT
              </span>
            </motion.div>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            {[
              { path: "/contact", label: "Contact" },
              { path: "/terms", label: "Terms" },
              { path: "/privacy", label: "Privacy" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-base font-medium transition-all hover:text-purple-600 ${
                  location.pathname === item.path
                    ? "text-purple-600"
                    : "text-gray-700"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                  />
                )}
              </Link>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl bg-gray-100 p-3 transition-colors hover:bg-gray-200 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-2 pb-6">
                {[
                  { path: "/contact", label: "Contact" },
                  { path: "/terms", label: "Terms" },
                  { path: "/privacy", label: "Privacy" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
