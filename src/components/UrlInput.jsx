/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useVideo } from "../context/VideoContext";
import ActionSelector from "./ActionSelector";

const BASE_URL = "https://freelikes.org";

export default function UrlInput({ initialVideoUrl }) {
  const [url, setUrl] = useState(initialVideoUrl || "");
  const [loading, setLoading] = useState(false);
  const {
    setVideoData,
    currentMode,
    setCurrentMode,
    clearVideoData,
    isInitialized,
    setIsInitialized,
  } = useVideo();

  const updateUrlWithMode = (videoUrl, mode) => {
    const newUrl = `/?video=${encodeURIComponent(videoUrl.trim())}&type=${mode}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    if (url) {
      updateUrlWithMode(url, mode);
    }
  };

  const handleSubmitWithUrl = useCallback(
    async (videoUrl, mode) => {
      setLoading(true);
      try {
        // Single API call to get both video and audio info
        const response = await axios.post(`${BASE_URL}/yt-api/video_info`, {
          url: videoUrl.trim(),
        });

        if (!response.data) {
          throw new Error("Failed to get video information");
        }

        // Check if duration exceeds 1 hour (3600 seconds)
        if (response.data.duration > 3600) {
          toast.error(
            "Video duration exceeds 1 hour limit. Please try a shorter video.",
            {
              style: {
                borderRadius: "10px",
                background: "#FF4D4D",
                color: "#fff",
                duration: 5000,
              },
            },
          );
          clearVideoData();
          return;
        }

        // Store the complete video data (includes both video and audio formats)
        setVideoData(response.data, videoUrl.trim());

        toast.success("Video information retrieved successfully!", {
          style: {
            borderRadius: "10px",
            background: "#4BB543",
            color: "#fff",
          },
        });

        const currentProcessingMode = mode || currentMode;
        updateUrlWithMode(videoUrl, currentProcessingMode);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          "Failed to process video. Please try again or check the URL.";
        toast.error(errorMessage, {
          style: {
            borderRadius: "10px",
            background: "#FF4D4D",
            color: "#fff",
          },
        });
        console.error("Processing error:", error);
        clearVideoData();
      } finally {
        setLoading(false);
      }
    },
    [currentMode, setVideoData, clearVideoData],
  );

  useEffect(() => {
    if (initialVideoUrl && !isInitialized) {
      const urlParams = new URLSearchParams(window.location.search);
      const actionType = urlParams.get("type");

      // Set the correct mode based on URL parameter
      const newMode = actionType === "video" ? "video" : "mp3";
      setCurrentMode(newMode);

      // Fetch video info (this will work for both modes since we get all data)
      handleSubmitWithUrl(initialVideoUrl, newMode);
      setIsInitialized(true);
    }
  }, [
    initialVideoUrl,
    handleSubmitWithUrl,
    isInitialized,
    setCurrentMode,
    setIsInitialized,
  ]);

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
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4">
      <ActionSelector
        selectedAction={currentMode}
        onActionSelect={handleModeChange}
      />
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
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-base font-medium text-white shadow-md transition-shadow duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-75"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Fetch Video
            </>
          )}
        </button>
      </form>
    </div>
  );
}
