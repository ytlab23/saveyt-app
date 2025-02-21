/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useVideo } from "../context/VideoContext";

const BASE_URL = "https://freetoolserver.org";

export default function UrlInput({ initialVideoUrl }) {
  // Receiving initialVideoUrl as prop
  const [url, setUrl] = useState(initialVideoUrl || "");
  const [loading, setLoading] = useState(false);
  const { setVideoInfo } = useVideo();
  const [hasInitialUrlBeenProcessed, setHasInitialUrlBeenProcessed] =
    useState(false);

  const handleSubmitWithUrl = useCallback(
    async (videoUrl) => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/yt-convert`, {
          url: videoUrl.trim(),
        });
        setVideoInfo(response.data, videoUrl.trim());

        const newUrl = `/?video=${encodeURIComponent(videoUrl.trim())}`;
        window.history.pushState({ path: newUrl }, "", newUrl);

        toast.success("Video converted successfully!", {
          style: {
            borderRadius: "10px",
            background: "#4BB543",
            color: "#fff",
          },
        });
      } catch (error) {
        toast.error(error.response?.data?.detail || "Failed to process video", {
          style: {
            borderRadius: "10px",
            background: "#FF4D4D",
            color: "#fff",
          },
        });
      } finally {
        setLoading(false);
      }
    },
    [setVideoInfo],
  );

  useEffect(() => {
    if (initialVideoUrl && !hasInitialUrlBeenProcessed) {
      handleSubmitWithUrl(initialVideoUrl);
      setHasInitialUrlBeenProcessed(true);
    }
  }, [initialVideoUrl, handleSubmitWithUrl, hasInitialUrlBeenProcessed]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL", {
        style: {
          borderRadius: "10px",
          background: "#FF4D4D",
          color: "#fff",
        },
      });
      return;
    }
    handleSubmitWithUrl(url);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-base font-medium text-white shadow-md transition-shadow duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-75" // More pronounced button style with shadow and updated gradient
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
