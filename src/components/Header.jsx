import { Link } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Download className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                SaveYT
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-indigo-600">
              Privacy
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-600"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/contact"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/terms"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
