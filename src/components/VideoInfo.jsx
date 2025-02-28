import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Download, User, Music, ChevronDown } from "lucide-react";
import { useVideo } from "../context/VideoContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShareMenu } from "./ShareMenu";

const BASE_URL = "https://freetoolserver.org";
// const VIDEO_BASE_URL = "http://localhost:3151";

const qualityOptions = [
  { value: "high", label: "High quality" },
  { value: "medium", label: "Medium quality" },
  { value: "low", label: "Low quality" },
];

export default function VideoInfo() {
  const { mp3Info, videoInfo, currentVideoUrl, currentMode } = useVideo();
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [downloadTaskId, setDownloadTaskId] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);
  const qualityMenuRef = useRef(null);

  // Get the appropriate info based on current mode
  const info = currentMode === "mp3" ? mp3Info : videoInfo;

  const isVideoTooLong = useMemo(() => {
    if (currentMode === "mp3") {
      return mp3Info?.duration_seconds > 3600;
    } else {
      return videoInfo?.lengthSeconds > 3600;
    }
  }, [currentMode, mp3Info, videoInfo]);

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

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // Status polling effect - works for both MP3 and video downloads
  useEffect(() => {
    if (downloadTaskId) {
      // Determine which API endpoint to use based on currentMode
      const statusEndpoint =
        currentMode === "mp3"
          ? `${BASE_URL}/conversion-status/${downloadTaskId}`
          : `${BASE_URL}/download-status/${downloadTaskId}`;

      // Start polling for status updates
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get(statusEndpoint);

          setDownloadStatus(response.data.status);
          setDownloadProgress(response.data.progress || 0);

          // If download is completed, stop polling and initiate download
          if (
            response.data.status === "completed" ||
            (currentMode === "mp3" && response.data.result?.file_id)
          ) {
            clearInterval(intervalId);
            setPollingInterval(null);

            // Start the actual file download
            if (currentMode === "mp3") {
              // For MP3, we need to trigger the actual download
              const fileId = response.data.result?.file_id || downloadTaskId;
              const link = document.createElement("a");
              link.href = `${BASE_URL}/yt-download/${fileId}`;
              link.setAttribute("download", `${info.title}.mp3`);
              document.body.appendChild(link);
              link.click();
              link.remove();
            } else if (response.data.download_url) {
              // For video, follow the download URL
              window.location.href = `${BASE_URL}${response.data.download_url}`;
            }

            // Reset download state after a short delay
            setTimeout(() => {
              setDownloading(false);
              setDownloadTaskId(null);
              setDownloadProgress(0);
              setDownloadStatus(null);
            }, 1000);

            const successMessage =
              currentMode === "mp3"
                ? "MP3 download ready!"
                : "Video download ready!";
            const icon = currentMode === "mp3" ? "🎵" : "🎥";

            toast.success(successMessage, {
              icon: icon,
              style: {
                borderRadius: "12px",
                background: "#8B5CF6",
                color: "#fff",
                fontWeight: "500",
              },
            });
          }

          // If there was an error, stop polling and show error
          if (response.data.status === "error") {
            clearInterval(intervalId);
            setPollingInterval(null);
            setDownloading(false);

            toast.error(
              `Download failed: ${response.data.message || "Unknown error"}`,
              {
                style: {
                  borderRadius: "12px",
                  background: "#EF4444",
                  color: "#fff",
                  fontWeight: "500",
                },
              },
            );
          }
        } catch (error) {
          console.error(
            `Error checking ${currentMode} download status:`,
            error,
          );

          // If we get consecutive errors, we might want to stop polling
          if (error.response && error.response.status === 404) {
            clearInterval(intervalId);
            setPollingInterval(null);
            setDownloading(false);

            toast.error("Download task not found", {
              style: {
                borderRadius: "12px",
                background: "#EF4444",
                color: "#fff",
                fontWeight: "500",
              },
            });
          }
        }
      }, 2000); // Check every 2 seconds

      setPollingInterval(intervalId);
    }
  }, [downloadTaskId, currentMode, info]);

  const handleMp3Download = async () => {
    if (!info?.file_id) {
      toast.error("File ID not found");
      return;
    }

    setDownloading(true);

    try {
      // Check if the file_id is a task_id from a conversion in progress
      if (info.task_id && info.status === "processing") {
        // If conversion is still processing, just start polling for status
        setDownloadTaskId(info.task_id);

        toast.success(
          "Download queued! Waiting for conversion to complete...",
          {
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#8B5CF6",
              color: "#fff",
              fontWeight: "500",
            },
          },
        );
      } else {
        // Try direct download first
        try {
          const checkResponse = await axios.get(
            `${BASE_URL}/yt-download/${info.file_id}`,
            { responseType: "blob" },
          );

          // If we got here, the file is ready for download
          const url = window.URL.createObjectURL(
            new Blob([checkResponse.data]),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${info.title}.mp3`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);

          setDownloading(false);

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
          // If we get a 202, it means conversion is still in progress
          if (error.response && error.response.status === 202) {
            setDownloadTaskId(info.file_id);
            setDownloadStatus(error.response.data.status || "processing");
            setDownloadProgress(error.response.data.progress || 0);

            toast.success("Conversion in progress. Please wait...", {
              duration: 3000,
              style: {
                borderRadius: "12px",
                background: "#8B5CF6",
                color: "#fff",
                fontWeight: "500",
              },
            });
          } else {
            throw error; // Re-throw to be caught by the outer catch
          }
        }
      }
    } catch (error) {
      setDownloading(false);
      toast.error("Download failed. Please try again.", {
        style: {
          borderRadius: "12px",
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
        },
      });
      console.error("MP3 download error:", error);
    }
  };

  const handleVideoDownload = async (quality) => {
    if (!info?.videoId) {
      toast.error("Video ID not found");
      return;
    }

    setDownloading(true);
    setShowQualityMenu(false);

    try {
      // Start the background download process
      const response = await axios.get(
        `${BASE_URL}/start-download/${info.videoId}/${quality}`,
      );

      setDownloadTaskId(response.data.task_id);

      toast.success("Download started! Please wait...", {
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#8B5CF6",
          color: "#fff",
          fontWeight: "500",
        },
      });
    } catch (error) {
      setDownloading(false);
      toast.error("Failed to start download. Please try again.");
      console.error(error);
    }
  };

  // Function to render progress
  const renderDownloadProgress = () => {
    if (!downloading || !downloadStatus) return null;

    return (
      <div className="mt-2 w-full">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>
            {downloadStatus === "queued" && "Preparing download..."}
            {downloadStatus === "processing" &&
              `${currentMode === "mp3" ? "Converting" : "Downloading"}: ${downloadProgress > 0 ? `${downloadProgress.toFixed(1)}%` : "Starting..."}`}
            {downloadStatus === "completed" && "Download complete!"}
            {downloadStatus === "error" && "Download failed"}
          </span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      </div>
    );
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
