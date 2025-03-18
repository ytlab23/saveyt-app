import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-8">
            <Link to="/" className="group flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
                SaveYT
              </span>
            </Link>
            <p className="max-w-md text-lg leading-relaxed text-gray-600">
              The fastest and most reliable YouTube to MP3 converter.
              High-quality audio conversion at your fingertips.
            </p>
            <div className="flex space-x-5">
              <Link
                to="/contact"
                className="rounded-full bg-gray-100 p-3 text-gray-700 transition-colors hover:bg-purple-100 hover:text-purple-600"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                Legal
              </h3>
              <ul className="mt-6 space-y-4">
                {["Terms", "Privacy", "Copyright"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-base font-medium text-gray-600 transition-colors hover:text-purple-600"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                Support
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    to="/contact"
                    className="text-base font-medium text-gray-600 transition-colors hover:text-purple-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} SaveYT. All rights reserved.
          </p>
          <p className="text-center text-sm text-gray-500">
            Built by{" "}
            <a
              href="https://t.me/Kvnq_poza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline decoration-purple-200 decoration-2 transition-colors hover:text-pink-600 hover:decoration-pink-200"
            >
              Kvn
            </a>{" "}
            for SaveYT.co
          </p>
        </div>
      </div>
    </footer>
  );
}
