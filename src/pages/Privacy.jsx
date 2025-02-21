import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { Lock, Database, Shield } from "lucide-react";

export default function Privacy() {
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold leading-tight text-transparent"
            >
              Privacy Policy
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10 rounded-3xl border border-gray-100 bg-white/90 p-12 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-pink-100 p-4">
                <Lock className="h-7 w-7 text-pink-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Information We Collect
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  We collect information that you provide directly to us when
                  using our service, including YouTube URLs that you submit for
                  conversion.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-purple-100 p-4">
                <Database className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  How We Use Your Information
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  We use the information we collect to provide and improve our
                  service, including converting YouTube videos to MP3 format.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-pink-100 p-4">
                <Shield className="h-7 w-7 text-pink-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Data Storage
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  Converted files are stored temporarily on our servers and are
                  automatically deleted after 15 minutes to ensure privacy and
                  optimize storage.
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
