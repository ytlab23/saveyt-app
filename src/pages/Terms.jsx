// Terms.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { Shield, Book, Clock } from "lucide-react";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundGradient />
      <Header />
      <main className="flex-1 pb-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl px-6"
        >
          <div className="mb-16 text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-5xl font-bold text-transparent" // Larger text and updated gradient
            >
              Terms of Service
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10 rounded-3xl border border-gray-100 bg-white/90 p-12 shadow-2xl backdrop-blur-sm" // Increased spacing, more rounded container, padding, shadow and border, softened white bg
          >
            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-pink-100 p-4">
                <Book className="h-7 w-7 text-pink-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Acceptance of Terms
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  By accessing and using SaveYT, you agree to be bound by these
                  Terms of Service and all applicable laws and regulations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-purple-100 p-4">
                <Shield className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Use License
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  Permission is granted to temporarily download one copy of the
                  materials for personal, non-commercial transitory viewing
                  only.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-pink-100 p-4">
                <Clock className="h-7 w-7 text-pink-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Modifications
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  SaveYT may revise these terms of service for its website at
                  any time without notice.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
