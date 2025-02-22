/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useVideo } from "../context/VideoContext";
import ActionSelector from "./ActionSelector";

const BASE_URL = "http://localhost:3150";

export default function UrlInput({ initialVideoUrl }) {
  const [url, setUrl] = useState(initialVideoUrl || "");
  const [loading, setLoading] = useState(false);
  const {
    setMp3Data,
    setVideoData,
    currentMode,
    setCurrentMode,
    clearVideoData,
    clearMp3Data,
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
        const currentProcessingMode = mode || currentMode;

        if (currentProcessingMode === "mp3") {
          const response = await axios.post(`${BASE_URL}/yt-convert`, {
            url: videoUrl.trim(),
          });
          setMp3Data(response.data, videoUrl.trim());
          clearVideoData();

          toast.success("Video ready for MP3 conversion!", {
            style: {
              borderRadius: "10px",
              background: "#4BB543",
              color: "#fff",
            },
          });
        } else {
          const response = await axios.post(`${BASE_URL}/video-info`, {
            type: "url",
            url: videoUrl.trim(),
          });

          if (!response.data || !response.data.formats) {
            throw new Error("Failed to get video formats");
          }

          setVideoData(response.data, videoUrl.trim());
          clearMp3Data();

          toast.success("Video information retrieved!", {
            style: {
              borderRadius: "10px",
              background: "#4BB543",
              color: "#fff",
            },
          });
        }

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
      } finally {
        setLoading(false);
      }
    },
    [currentMode, setMp3Data, setVideoData, clearVideoData, clearMp3Data],
  );

  useEffect(() => {
    if (initialVideoUrl && !isInitialized) {
      const urlParams = new URLSearchParams(window.location.search);
      const actionType = urlParams.get("type");

      // Set the correct mode based on URL parameter
      const newMode = actionType === "video" ? "video" : "mp3";
      setCurrentMode(newMode);

      // Pass the mode explicitly to handleSubmitWithUrl
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
          placeholder={`Paste YouTube URL here for ${currentMode === "mp3" ? "MP3 conversion" : "video download"}...`}
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
              {currentMode === "mp3" ? "Convert" : "Get Video Info"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
