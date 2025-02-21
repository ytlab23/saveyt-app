import { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useVideo } from "../context/VideoContext";

const BASE_URL = "http://localhost:3150";

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
    <div className="mx-auto w-full max-w-3xl px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
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
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Convert
            </>
          )}
        </button>
      </form>
    </div>
  );
}
