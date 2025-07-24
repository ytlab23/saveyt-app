import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Download, User, Music, ChevronDown } from "lucide-react";
import { useVideo } from "../context/VideoContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShareMenu } from "./ShareMenu";
import webSocketManager from "../websocket/WebSocketManager";

const BASE_URL = "https://freelikes.org";

// Helper function to format file sizes
const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "Unknown";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

// Helper function to format numbers (views, likes)
const formatNumber = (num) => {
  if (!num) return "0";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Format duration helper
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// Helper function to format publication date
const formatPublishDate = (dateString) => {
  if (!dateString) return "Unknown";

  // Handle YYYYMMDD format
  if (dateString.length === 8) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Handle other date formats
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function VideoInfo() {
  const { videoInfo, currentVideoUrl, currentMode } = useVideo();
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [currentJobId, setCurrentJobId] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);
  const qualityMenuRef = useRef(null);

  // Utility to filter formats based on mode
  const filterFormatsByMode = (formats, mode) => {
    if (!formats) return [];

    return formats.filter((format) => {
      if (mode === "mp3") {
        return format.type === "mp3" || format.audioOnly === true;
      } else {
        return format.type === "mp4" && !format.audioOnly;
      }
    });
  };

  // Utility to extract and clean quality options
  const extractQualityOptions = (formats) => {
    const options = formats.map((format) => ({
      value: format.quality,
      label: `${format.formatNote}`,
      itag: format.itag,
      size: format.size,
    }));

    // Remove duplicates and sort
    return options
      .filter(
        (opt, index, arr) =>
          arr.findIndex((q) => q.value === opt.value) === index,
      )
      .sort((a, b) => b.value - a.value);
  };

  // Memoized filtered formats
  const availableFormats = useMemo(() => {
    return filterFormatsByMode(videoInfo?.formats, currentMode);
  }, [videoInfo, currentMode]);

  // Memoized quality options
  const qualityOptions = useMemo(() => {
    return currentMode === "mp3" ? [] : extractQualityOptions(availableFormats);
  }, [availableFormats, currentMode]);

  const mp3Format = useMemo(() => {
    return filterFormatsByMode(videoInfo?.formats, "mp3")?.find(
      (f) => f.type === "mp3",
    );
  }, [videoInfo]);

  const isVideoTooLong = useMemo(() => {
    return videoInfo?.duration > 3600;
  }, [videoInfo]);

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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
      if (currentJobId) {
        webSocketManager.unsubscribeFromJob(currentJobId);
      }
    };
  }, [pollingInterval, currentJobId]);

  // WebSocket and polling management
  const startJobMonitoring = async (jobId) => {
    // Try WebSocket first
    const wsConnected = await webSocketManager.subscribeToJob(
      jobId,
      (jobData) => {
        handleJobUpdate(jobData);
      },
    );

    if (!wsConnected) {
      startPolling(jobId);
    }
  };

  const startPolling = (jobId) => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(`${BASE_URL}/yt-api/status/${jobId}`);
        handleJobUpdate(response.data);
      } catch (error) {
        console.error("Polling error:", error);
        if (error.response?.status === 404) {
          clearInterval(intervalId);
          setPollingInterval(null);
          handleJobError("Job not found");
        }
      }
    }, 2000);

    setPollingInterval(intervalId);
  };

  const handleJobUpdate = (jobData) => {
    setDownloadStatus(jobData.status);
    setDownloadMessage(jobData.message || "Processing...");

    // Parse progress - it might come as string with % or as number
    let progress = 0;
    if (typeof jobData.progress === "string") {
      progress = parseFloat(jobData.progress.replace("%", "")) || 0;
    } else if (typeof jobData.progress === "number") {
      progress = jobData.progress;
    }
    setDownloadProgress(progress);

    if (jobData.status === "completed") {
      handleJobComplete(jobData);
    } else if (jobData.status === "error") {
      handleJobError(jobData.error || "Processing failed");
    }
  };

  const handleJobComplete = (jobData) => {
    // Stop monitoring
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    if (currentJobId) {
      webSocketManager.unsubscribeFromJob(currentJobId);
    }

    // Start download
    const downloadUrl = jobData.downloadUrl.startsWith("http")
      ? jobData.downloadUrl
      : `${BASE_URL}${jobData.downloadUrl}`;

    // Auto-download with a small delay
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = jobData.filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);

    const fileType = currentMode === "mp3" ? "Audio" : "Video";
    toast.success(
      `${fileType} download completed! Download will start automatically...`,
      {
        icon: currentMode === "mp3" ? "🎵" : "🎥",
        style: {
          borderRadius: "12px",
          background: "#8B5CF6",
          color: "#fff",
          fontWeight: "500",
        },
      },
    );

    // Reset state
    setTimeout(() => {
      setDownloading(false);
      setCurrentJobId(null);
      setDownloadProgress(0);
      setDownloadStatus(null);
      setDownloadMessage("");
    }, 1000);
  };

  const handleJobError = (error) => {
    console.error("Job error:", error);

    // Stop monitoring
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    if (currentJobId) {
      webSocketManager.unsubscribeFromJob(currentJobId);
    }

    toast.error(`Download failed: ${error}`, {
      style: {
        borderRadius: "12px",
        background: "#EF4444",
        color: "#fff",
        fontWeight: "500",
      },
    });

    // Reset state
    setDownloading(false);
    setCurrentJobId(null);
    setDownloadProgress(0);
    setDownloadStatus(null);
    setDownloadMessage("");
  };

  const handleMp3Download = async () => {
    if (!videoInfo) {
      toast.error("Video information not found");
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);
    setDownloadStatus("starting");
    setDownloadMessage("Initiating MP3 conversion...");

    try {
      const response = await axios.post(`${BASE_URL}/yt-api/download`, {
        url: currentVideoUrl,
        format: "mp3",
      });

      if (response.data.directDownload) {
        // Direct download available
        if (response.data.openInNewTab) {
          window.open(response.data.downloadUrl, "_blank");
        } else {
          window.location.href = response.data.downloadUrl;
        }

        toast.success("MP3 download started!", {
          icon: "🎵",
          style: {
            borderRadius: "12px",
            background: "#8B5CF6",
            color: "#fff",
            fontWeight: "500",
          },
        });

        setDownloading(false);
      } else {
        // Processing required
        setCurrentJobId(response.data.jobId);
        setDownloadStatus("queued");
        setDownloadMessage("Queued for processing...");

        await startJobMonitoring(response.data.jobId);

        toast.success("Conversion started. Please wait...", {
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#8B5CF6",
            color: "#fff",
            fontWeight: "500",
          },
        });
      }
    } catch (error) {
      console.error("MP3 download error:", error);
      const errorMessage =
        error.response?.data?.error || "Download failed. Please try again.";
      handleJobError(errorMessage);
    }
  };

  const handleVideoDownload = async (quality) => {
    if (!videoInfo?.id) {
      toast.error("Video ID not found");
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);
    setDownloadStatus("starting");
    setDownloadMessage("Initiating video download...");
    setShowQualityMenu(false);

    try {
      // Find the format with the selected quality
      const selectedFormat = availableFormats.find(
        (format) => format.quality === quality,
      );

      const response = await axios.post(`${BASE_URL}/yt-api/download`, {
        url: currentVideoUrl,
        format: "mp4",
        quality: quality,
        itag: selectedFormat?.itag,
      });

      if (response.data.directDownload) {
        // Direct download available
        if (response.data.openInNewTab) {
          window.open(response.data.downloadUrl, "_blank");
        } else {
          window.location.href = response.data.downloadUrl;
        }

        toast.success("Video download started!", {
          icon: "🎥",
          style: {
            borderRadius: "12px",
            background: "#8B5CF6",
            color: "#fff",
            fontWeight: "500",
          },
        });

        setDownloading(false);
      } else {
        // Processing required
        setCurrentJobId(response.data.jobId);
        setDownloadStatus("queued");
        setDownloadMessage("Queued for processing...");

        await startJobMonitoring(response.data.jobId);

        toast.success("Download started! Please wait...", {
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#8B5CF6",
            color: "#fff",
            fontWeight: "500",
          },
        });
      }
    } catch (error) {
      console.error("Video download error:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to start download. Please try again.";
      handleJobError(errorMessage);
    }
  };

  // Function to render progress
  const renderDownloadProgress = () => {
    if (!downloading || !downloadStatus) return null;

    return (
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>{downloadMessage}</span>
          <span>{downloadProgress.toFixed(1)}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      </div>
    );
  };

  // Format duration helper
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Format views helper
  const formatViews = (viewCount) => {
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M views`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K views`;
    }
    return `${viewCount} views`;
  };

  if (!videoInfo) return null;

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
            src={videoInfo.thumbnail}
            alt={videoInfo.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {videoInfo.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-gray-700 sm:gap-4">
              <div className="flex items-center rounded-full bg-purple-100 px-3 py-1 sm:px-4">
                <User className="mr-1 h-4 w-4 text-purple-600 sm:mr-2" />
                <span className="text-sm font-medium text-purple-900 sm:text-base">
                  {videoInfo.channelTitle}
                </span>
              </div>

              <div className="flex items-center rounded-full bg-pink-100 px-3 py-1 sm:px-4">
                <Clock className="mr-1 h-4 w-4 text-pink-600 sm:mr-2" />
                <span className="text-sm font-medium text-pink-900 sm:text-base">
                  {formatDuration(videoInfo.duration)}
                </span>
              </div>

              {videoInfo.viewCount && (
                <div className="flex items-center rounded-full bg-blue-100 px-3 py-1 sm:px-4">
                  <span className="text-sm font-medium text-blue-900 sm:text-base">
                    {formatViews(videoInfo.viewCount)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:mt-8">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {isVideoTooLong ? (
                <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-800">
                  <h3 className="font-bold">Video Too Long</h3>
                  <p>
                    This video exceeds the 1 hour limit. Please try a shorter
                    video.
                  </p>
                </div>
              ) : (
                <>
                  {currentMode === "mp3" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMp3Download}
                      disabled={downloading}
                      className="group inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-75"
                    >
                      {downloading ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Music className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                          Download MP3
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <div className="relative" ref={qualityMenuRef}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          !downloading && setShowQualityMenu(!showQualityMenu)
                        }
                        disabled={downloading}
                        className="inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-75"
                      >
                        {downloading ? (
                          <>
                            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-5 w-5" />
                            Video Download
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {showQualityMenu && !downloading && (
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
                                onClick={() =>
                                  handleVideoDownload(option.value)
                                }
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
                </>
              )}

              <ShareMenu videoUrl={currentVideoUrl} currentMode={currentMode} />
            </div>

            {renderDownloadProgress()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
