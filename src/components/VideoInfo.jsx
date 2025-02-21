// VideoInfo.jsx
import { Clock, Download, User } from "lucide-react";
import { useVideo } from "../context/VideoContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ShareMenu } from "./ShareMenu";

const BASE_URL = "https://freetoolserver.org";

export default function VideoInfo() {
  const { videoInfo, currentVideoUrl } = useVideo();

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

  if (!videoInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-8 w-full max-w-4xl rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm"
    >
      <div className="flex flex-col gap-8 md:flex-row">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-video w-full overflow-hidden rounded-xl md:w-[400px]"
        >
          <img
            src={videoInfo.thumbnail_url}
            alt={videoInfo.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight text-gray-900">
              {videoInfo.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-gray-700">
              <div className="flex items-center rounded-full bg-purple-100 px-4 py-1">
                <User className="mr-2 h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">
                  {videoInfo.author}
                </span>
              </div>

              <div className="flex items-center rounded-full bg-pink-100 px-4 py-1">
                <Clock className="mr-2 h-4 w-4 text-pink-600" />
                <span className="font-medium text-pink-900">
                  {videoInfo.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="group inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
              Download MP3
            </motion.button>

            <ShareMenu videoUrl={currentVideoUrl} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
