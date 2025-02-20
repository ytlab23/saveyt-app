import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="text-indigo-600 text-2xl font-bold">
              SaveYT
            </Link>
            <p className="text-gray-500 text-base">
              The fastest and most reliable YouTube to MP3 converter.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/terms"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/copyright"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Copyright
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-medium text-gray-900">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to="/contact"
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} SaveYT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
