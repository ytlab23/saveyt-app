import { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useVideo } from "../context/VideoContext";

const BASE_URL = "https://freetoolserver.org";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { setVideoInfo } = useVideo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/yt-convert`, {
        url: url.trim(),
      });
      setVideoInfo(response.data);
      toast.success("Video converted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to process video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Convert
            </>
          )}
        </button>
      </form>
    </div>
  );
}
