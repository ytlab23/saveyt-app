/* eslint-disable no-unused-vars */
import { Download } from "lucide-react";
import { useVideo } from "../context/VideoContext";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://freetoolserver.org";

export default function VideoInfo() {
  const { videoInfo } = useVideo();

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/yt-download/${videoInfo.file_id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${videoInfo.title}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download file");
    }
  };

  if (!videoInfo) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={videoInfo.thumbnail_url}
          alt={videoInfo.title}
          className="w-full md:w-48 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {videoInfo.title}
          </h2>
          <p className="text-gray-600 mb-2">By {videoInfo.author}</p>
          <p className="text-gray-600 mb-4">Duration: {videoInfo.duration}</p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="w-5 h-5 mr-2" />
            Download MP3
          </button>
        </div>
      </div>
    </div>
  );
}
