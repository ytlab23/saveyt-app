/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [mp3Info, setMp3Info] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [currentMode, setCurrentMode] = useState("mp3");

  const setMp3Data = (info, url) => {
    setMp3Info(info);
    setCurrentVideoUrl(url);
  };

  const setVideoData = (info, url) => {
    setVideoInfo(info);
    setCurrentVideoUrl(url);
  };

  const clearVideoData = () => {
    setVideoInfo(null);
  };

  const clearMp3Data = () => {
    setMp3Info(null);
  };

  return (
    <VideoContext.Provider
      value={{
        mp3Info,
        videoInfo,
        currentVideoUrl,
        currentMode,
        setCurrentMode,
        setMp3Data,
        setVideoData,
        clearVideoData,
        clearMp3Data,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
