import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Terms() {
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
            Terms and Conditions
          </h1>
          <div className="prose prose-indigo">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using SaveYT, you accept and agree to be bound by
              the terms and provision of this agreement.
            </p>
            <h2>Use License</h2>
            <p>
              This service should only be used to download content that you have
              the right to download. We do not encourage or support unauthorized
              downloading of copyrighted material.
            </p>
            <h2>Service Limitations</h2>
            <p>
              - Maximum video length: 1 hour - Maximum file storage time: 15
              minutes - File quality: 320kbps MP3
            </p>
            {/* Add more terms content as needed */}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
