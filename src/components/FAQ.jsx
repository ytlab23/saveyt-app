import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What can I do with SaveYT?",
    answer:
      "SaveYT offers two main features: You can convert YouTube videos to high-quality MP3 files for music, podcasts, or audio content, and you can also download YouTube videos in various quality options for offline viewing.",
  },
  {
    question: "How do I convert YouTube videos to MP3?",
    answer:
      'Select "MP3 Converter" mode, paste the YouTube video URL into the input field, and click "Convert". Once the video is processed, click the "Download MP3" button to save the audio file.',
  },
  {
    question: "How do I download YouTube videos?",
    answer:
      'Select "Video Download" mode, paste the YouTube video URL, and click "Get Video Info". Once processed, you can choose your preferred video quality (high, medium, or low) and download the video.',
  },
  {
    question: "What video quality options are available?",
    answer:
      "For video downloads, we offer three quality options: High (up to 1080p), Medium (up to 720p), and Low (up to 480p). The actual quality will depend on the original video's available formats.",
  },
  {
    question: "Is there a limit to the video length?",
    answer:
      "Yes, currently we support videos up to 1 hour in length to ensure optimal conversion quality and server performance. This applies to both MP3 conversion and video downloads.",
  },
  {
    question: "Is this service free?",
    answer:
      "Yes, SaveYT is completely free to use. We do not require any registration or payment for either MP3 conversion or video downloads.",
  },
  {
    question: "What is the quality of the converted MP3?",
    answer:
      "We convert videos to high-quality 320kbps MP3 files to ensure the best possible audio experience.",
  },
  {
    question: "Do you store downloaded files?",
    answer:
      "No, converted MP3s and downloaded videos are stored temporarily for 15 minutes for download purposes and then automatically deleted. We value your privacy and do not keep any user content.",
  },
  {
    question: "Can I download multiple videos at once?",
    answer:
      "Yes, for both MP3 conversion and video downloads, you can process multiple videos by entering multiple URLs separated by new lines in the input field.",
  },
  {
    question: "Is it legal to save YouTube videos locally?",
    answer: (
      <>
        Yes, as long as the video is not copyrighted and you don&apos;t plan to
        use its copyrighted material elsewhere. Learn more at{" "}
        <a
          href="https://www.techadvisor.com/article/725837/is-it-legal-download-youtube-videos.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-medium text-purple-600 underline decoration-purple-200 decoration-2 transition-colors hover:text-pink-600 hover:decoration-pink-200"
        >
          Tech Advisor&apos;s article about YouTube downloads
        </a>
        .
      </>
    ),
  },
  {
    question: "Can I save subtitles, transcripts, or thumbnails?",
    answer: (
      <>
        No, we only allow saving audio and video files. If you need to download
        subtitles, transcripts, or thumbnails, we recommend using{" "}
        <a
          href="https://tubepilot.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-medium text-purple-600 underline decoration-purple-200 decoration-2 transition-colors hover:text-pink-600 hover:decoration-pink-200"
        >
          TubePilot
        </a>
        .
      </>
    ),
  },
  {
    question: "How can I play MP3 or video files locally?",
    answer: (
      <>
        You can play MP3 and video files using built-in media players on your
        device. On Windows, use <strong>Windows Media Player</strong> or{" "}
        <strong>VLC Media Player</strong>. On Mac, use{" "}
        <strong>QuickTime</strong> or <strong>VLC</strong>. For mobile devices,
        most default music and video apps will work. If you need additional
        options, you can find media players on{" "}
        <a
          href="https://en.softonic.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-medium text-purple-600 underline decoration-purple-200 decoration-2 transition-colors hover:text-pink-600 hover:decoration-pink-200"
        >
          Softonic
        </a>
        .
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      <h2 className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-4xl font-bold text-transparent">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
                <Disclosure.Button className="flex w-full justify-between px-6 py-5 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span className="pr-6">{faq.question}</span>
                  <ChevronDown
                    className={`${
                      open
                        ? "rotate-180 transform text-pink-500"
                        : "text-gray-400"
                    } h-6 w-6 flex-shrink-0 transition-transform duration-300`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-150 ease-in"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="bg-gray-50 px-6 pb-6 pt-4">
                    <div className="text-lg leading-relaxed text-gray-700">
                      {faq.answer}
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
