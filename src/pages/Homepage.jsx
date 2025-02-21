import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  const initialVideoUrl = searchParams.get("video") || "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundGradient />
      <Header />

      <main className="flex-1 pt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12"
        >
          <div className="mb-16 px-6 text-center lg:px-8">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
                YouTube to MP3 Converter
              </h1>
              <Sparkles className="h-8 w-8 text-pink-600" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-xl text-gray-600"
            >
              Convert and download YouTube videos to high-quality MP3 files
              instantly. Enjoy your favorite music offline!
            </motion.p>
          </div>

          <motion.div variants={itemVariants}>
            <UrlInput initialVideoUrl={initialVideoUrl} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <VideoInfo />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <ArrowDown className="h-8 w-8 animate-bounce text-purple-600" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FAQ />
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
