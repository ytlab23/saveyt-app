/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link2, Check, Facebook, Twitter, Send } from "lucide-react";
import toast from "react-hot-toast";

export const ShareMenu = ({ videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}?video=${encodeURIComponent(videoUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard write failed:", err);
      toast.error("Failed to copy link to clipboard.", {
        style: {
          borderRadius: "10px",
          background: "#FF4D4D",
          color: "#fff",
        },
      });
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: Send,
      color: "bg-green-500",
      href: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-medium text-gray-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
      >
        <Share2 className="mr-2 h-5 w-5" />
        Share
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5"
          >
            <div className="space-y-3">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-lg p-2 transition-colors hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <option.icon
                    className={`mr-3 h-5 w-5 rounded-md p-1 text-white ${option.color}`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option.name}
                  </span>
                </a>
              ))}
              <button
                onClick={handleCopy}
                className={
                  "flex w-full items-center rounded-lg p-2 transition-colors hover:bg-gray-100"
                }
              >
                {copied ? (
                  <Check className="mr-3 h-5 w-5 rounded-md bg-green-500 p-1 text-white" />
                ) : (
                  <Link2 className="mr-3 h-5 w-5 rounded-md bg-gray-500 p-1 text-white" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
