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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-white"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Download className="h-8 w-8 transform text-indigo-600 transition-transform group-hover:rotate-12" />
              <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                SaveYT
              </span>
            </motion.div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center space-x-8 md:flex">
            {[
              { path: "/contact", label: "Contact" },
              { path: "/terms", label: "Terms" },
              { path: "/privacy", label: "Privacy" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden py-4 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {[
                  { path: "/contact", label: "Contact" },
                  { path: "/terms", label: "Terms" },
                  { path: "/privacy", label: "Privacy" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`rounded-lg px-4 py-2 transition-colors ${
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50"
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
