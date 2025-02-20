import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UrlInput from "../components/UrlInput";
import VideoInfo from "../components/VideoInfo";
import FAQ from "../components/FAQ";
import { motion } from "framer-motion";

export default function Homepage() {
  useEffect(() => {
    document.title = "SaveYT | Free YouTube to MP3 Converter";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              YouTube to MP3 Converter
            </h1>
            <p className="text-xl text-gray-600">
              Convert and download YouTube videos to MP3 in high quality
            </p>
          </div>
          <UrlInput />
          <VideoInfo />
          <FAQ />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
