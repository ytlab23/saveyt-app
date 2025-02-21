import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BackgroundGradient } from "../components/BackgroundGradient";
import {
  Copyright as CopyrightIcon,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function Copyright() {
  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundGradient />
      <Header />
      <main className="flex-1 pb-16 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl px-6"
        >
          <div className="mb-16 text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-5xl font-bold leading-tight text-transparent"
            >
              Copyright Information
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10 rounded-3xl bg-gradient-to-br from-white/95 to-white/90 p-12 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 p-4 shadow-inner">
                <CopyrightIcon className="h-7 w-7 text-pink-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Copyright Policy
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  SaveYT respects the intellectual property rights of others and
                  expects its users to do the same. In accordance with the
                  Digital Millennium Copyright Act of 1998, we will respond
                  expeditiously to claims of copyright infringement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 p-4 shadow-inner">
                <FileText className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  DMCA Notices
                </h2>
                <p className="mb-5 text-lg leading-relaxed text-gray-700">
                  If you believe that your copyrighted work has been copied in a
                  way that constitutes copyright infringement, please provide
                  our copyright agent with the following information:
                </p>
                <div className="space-y-4 rounded-xl bg-gradient-to-br from-gray-50 to-white/50 p-7 shadow-inner">
                  {[
                    "A description of the copyrighted work",
                    "A description of where the material is located on our service",
                    "Your contact information",
                    "A statement of good faith belief",
                    "A statement of accuracy under penalty of perjury",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <AlertCircle className="h-6 w-6 flex-shrink-0 text-pink-600" />
                      <p className="text-lg text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
