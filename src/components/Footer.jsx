import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                SaveYT
              </span>
            </Link>
            <p className="max-w-md text-gray-500">
              The fastest and most reliable YouTube to MP3 converter.
              High-quality audio conversion at your fingertips.
            </p>
            <div className="flex space-x-4">
              <Link to="/contact">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {["Terms", "Privacy", "Copyright"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-base text-gray-500 transition-colors hover:text-indigo-600"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-base text-gray-500 transition-colors hover:text-indigo-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} SaveYT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
