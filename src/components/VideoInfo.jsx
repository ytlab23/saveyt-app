import { useEffect, useRef, useState } from "react";
import { Clock, Download, User, Music, ChevronDown } from "lucide-react";
import { useVideo } from "../context/VideoContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShareMenu } from "./ShareMenu";

const BASE_URL = "https://freetoolserver.org";

const qualityOptions = [
  { value: "high", label: "High quality" },
  { value: "medium", label: "Medium quality" },
  { value: "low", label: "Low quality" },
];

export default function VideoInfo() {
  const { mp3Info, videoInfo, currentVideoUrl, currentMode } = useVideo();
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const qualityMenuRef = useRef(null);

  // Get the appropriate info based on current mode
  const info = currentMode === "mp3" ? mp3Info : videoInfo;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        qualityMenuRef.current &&
        !qualityMenuRef.current.contains(event.target)
      ) {
        setShowQualityMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMp3Download = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/yt-download/${info.file_id}`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${info.title}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("MP3 download started!", {
        icon: "🎵",
        style: {
          borderRadius: "12px",
          background: "#8B5CF6",
          color: "#fff",
          fontWeight: "500",
        },
      });
    } catch (error) {
      toast.error("Download failed", {
        style: {
          borderRadius: "12px",
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
        },
      });
      console.error(error);
    }
  };

  const handleVideoDownload = async (quality) => {
    if (!info?.videoId) {
      toast.error("Video ID not found");
      return;
    }

    setDownloading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/download-youtube-video/${info.videoId}/${quality}`,
        {
          responseType: "blob",
          timeout: 300000, // 5 minute timeout
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${info.title}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Video download started!", {
        icon: "🎥",
        style: {
          borderRadius: "12px",
          background: "#8B5CF6",
          color: "#fff",
          fontWeight: "500",
        },
      });
    } catch (error) {
      toast.error("Download failed. Please try again.");
      console.error(error);
    } finally {
      setDownloading(false);
      setShowQualityMenu(false);
    }
  };

  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto mt-4 w-full max-w-4xl space-y-4 rounded-2xl bg-white/80 p-4 shadow-2xl backdrop-blur-sm sm:mt-8 sm:space-y-0 sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:gap-8 md:flex-row">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-video w-full overflow-hidden rounded-xl md:w-[400px]"
        >
          <img
            src={info.thumbnail || info.thumbnail_url}
            alt={info.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {info.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-gray-700 sm:gap-4">
              <div className="flex items-center rounded-full bg-purple-100 px-3 py-1 sm:px-4">
                <User className="mr-1 h-4 w-4 text-purple-600 sm:mr-2" />
                <span className="text-sm font-medium text-purple-900 sm:text-base">
                  {info.author}
                </span>
              </div>

              <div className="flex items-center rounded-full bg-pink-100 px-3 py-1 sm:px-4">
                <Clock className="mr-1 h-4 w-4 text-pink-600 sm:mr-2" />
                <span className="text-sm font-medium text-pink-900 sm:text-base">
                  {info.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-8 sm:gap-4">
            {currentMode === "mp3" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMp3Download}
                className="group inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                <Music className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                Download MP3
              </motion.button>
            ) : (
              <div className="relative" ref={qualityMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  disabled={downloading}
                  className="inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-75"
                >
                  {downloading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Video Download
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showQualityMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="fixed right-4 mt-2 w-[calc(100vw-2rem)] origin-top-right rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 sm:absolute sm:right-0 sm:w-48"
                      style={{
                        zIndex: 100,
                      }}
                    >
                      {qualityOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleVideoDownload(option.value)}
                          className="flex w-full items-center rounded-lg p-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <ShareMenu videoUrl={currentVideoUrl} currentMode={currentMode} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
