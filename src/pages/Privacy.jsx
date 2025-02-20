import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-indigo">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when using
              our service, including YouTube URLs that you submit for
              conversion.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide and improve our
              service, including converting YouTube videos to MP3 format.
            </p>
            <h2>Data Storage</h2>
            <p>
              Converted files are stored temporarily on our servers and are
              automatically deleted after 15 minutes to ensure privacy and
              optimize storage.
            </p>
            {/* Add more privacy policy content as needed */}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
