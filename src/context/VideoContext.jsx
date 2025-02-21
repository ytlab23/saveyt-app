/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  const setVideoData = (info, url) => {
    setVideoInfo(info);
    setCurrentVideoUrl(url);
  };

  return (
    <VideoContext.Provider
      value={{ videoInfo, setVideoInfo: setVideoData, currentVideoUrl }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
