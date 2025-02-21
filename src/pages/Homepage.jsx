import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { BackgroundGradient } from "../components/BackgroundGradient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UrlInput from "../components/UrlInput";
import VideoInfo from "../components/VideoInfo";
import FAQ from "../components/FAQ";

export default function Homepage() {
  useEffect(() => {
    document.title = "SaveYT | Free YouTube to MP3 Converter";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundGradient />
      <Header />
      <main className="flex-1 pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-12"
        >
          <div className="mb-12 px-4 text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent"
            >
              YouTube to MP3 Converter
            </motion.h1>
            <motion.p
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-gray-600"
            >
              Convert and download YouTube videos to high-quality MP3 files
              instantly
            </motion.p>
          </div>

          <UrlInput />
          <VideoInfo />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <ArrowDown className="h-8 w-8 animate-bounce text-indigo-600" />
          </motion.div>

          <FAQ />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
