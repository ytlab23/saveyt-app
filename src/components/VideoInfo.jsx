import { Download, Share2, Clock, User } from "lucide-react";
import { useVideo } from "../context/VideoContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:3150";

export default function VideoInfo() {
  const { videoInfo } = useVideo();

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/yt-download/${videoInfo.file_id}`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${videoInfo.title}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started!", {
        icon: "🎵",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to download file");
      console.error(error);
    }
  };

  if (!videoInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="flex flex-col gap-6 md:flex-row">
        <motion.div whileHover={{ scale: 1.02 }} className="group relative">
          <img
            src={videoInfo.thumbnail_url}
            alt={videoInfo.title}
            className="h-48 w-full rounded-xl object-cover shadow-md md:w-48"
          />
          <div className="absolute inset-0 rounded-xl bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30" />
        </motion.div>

        <div className="flex-1 space-y-4">
          <h2 className="line-clamp-2 text-2xl font-bold text-gray-900">
            {videoInfo.title}
          </h2>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{videoInfo.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{videoInfo.duration}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Download className="mr-2 h-5 w-5" />
              Download MP3
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-xl bg-gray-100 px-6 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
