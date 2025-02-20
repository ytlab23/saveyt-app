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
];

export default function FAQ() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
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
