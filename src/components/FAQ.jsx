// FAQ.jsx
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I convert YouTube videos to MP3?",
    answer:
      'Simply paste the YouTube video URL into the input field and click "Convert". Once the video is processed, click the "Download MP3" button to save the audio file.',
  },
  {
    question: "Is there a limit to the video length?",
    answer:
      "Yes, currently we support videos up to 1 hour in length to ensure optimal conversion quality and server performance.",
  },
  {
    question: "Is this service free?",
    answer:
      "Yes, SaveYT is completely free to use. We do not require any registration or payment.",
  },
  {
    question: "What is the quality of the converted MP3?",
    answer:
      "We convert videos to high-quality 320kbps MP3 files to ensure the best possible audio experience.",
  },
  {
    question: "Do you store converted files?",
    answer:
      "No, converted files are stored temporarily for 15 minutes for download purposes and then automatically deleted. We value your privacy.", // Added FAQ about data storage
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      {" "}
      {/* Increased padding */}
      <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
        {" "}
        {/* Larger heading, increased margin */}
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {" "}
        {/* Increased spacing */}
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gray-50 px-5 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-pink-500 focus-visible:ring-opacity-75">
                  {" "}
                  {/* Increased padding and font size, updated focus ring color */}
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`${
                      open
                        ? "rotate-180 transform text-pink-500"
                        : "text-gray-500" // Updated icon color when open
                    } h-6 w-6 transition-transform duration-300`} // Added transition to icon
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-200 ease-out" // Shortened transition duration
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-150 ease-in" // Shortened transition duration
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="rounded-xl bg-gray-50 px-5 pb-5 pt-4 text-lg text-gray-700">
                    {" "}
                    {/* Increased padding and font size, darker text */}
                    {faq.answer}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
