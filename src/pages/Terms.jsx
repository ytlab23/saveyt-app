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
      <main className="flex-1 pb-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl px-4"
        >
          <div className="mb-12 text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent"
            >
              Terms and Conditions
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-indigo-100 p-3">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  Acceptance of Terms
                </h2>
                <p className="leading-relaxed text-gray-600">
                  By accessing and using SaveYT, you accept and agree to be
                  bound by the terms and provision of this agreement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-purple-100 p-3">
                <Book className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  Use License
                </h2>
                <p className="leading-relaxed text-gray-600">
                  This service should only be used to download content that you
                  have the right to download. We do not encourage or support
                  unauthorized downloading of copyrighted material.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-indigo-100 p-3">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  Service Limitations
                </h2>
                <div className="space-y-2 rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    <p className="text-gray-600">
                      Maximum video length: 1 hour
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    <p className="text-gray-600">
                      Maximum file storage time: 15 minutes
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    <p className="text-gray-600">File quality: 320kbps MP3</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
