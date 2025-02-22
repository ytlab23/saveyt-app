/* eslint-disable react/prop-types */
import { Music, Video } from "lucide-react";

export default function ActionSelector({ selectedAction, onActionSelect }) {
  return (
    <div className="mx-auto mb-4 flex w-full max-w-3xl justify-center gap-2 px-4 sm:mb-8 sm:gap-4 sm:px-8">
      <button
        onClick={() => onActionSelect("mp3")}
        className={`flex items-center rounded-xl px-3 py-2 font-semibold shadow-lg transition-all hover:shadow-xl sm:px-6 sm:py-3 ${
          selectedAction === "mp3"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        <Music className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
        <span className="text-sm sm:text-base">MP3</span>
      </button>
      <button
        onClick={() => onActionSelect("video")}
        className={`flex items-center rounded-xl px-3 py-2 font-semibold shadow-lg transition-all hover:shadow-xl sm:px-6 sm:py-3 ${
          selectedAction === "video"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        <Video className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
        <span className="text-sm sm:text-base">Video</span>
      </button>
    </div>
  );
}
