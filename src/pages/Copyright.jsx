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
      <main className="flex-1 pb-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl px-4"
        >
          <div className="mb-12 text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent"
            >
              Copyright Information
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-indigo-100 p-3">
                <CopyrightIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  Copyright Policy
                </h2>
                <p className="leading-relaxed text-gray-600">
                  SaveYT respects the intellectual property rights of others and
                  expects its users to do the same. In accordance with the
                  Digital Millennium Copyright Act of 1998, we will respond
                  expeditiously to claims of copyright infringement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-purple-100 p-3">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  DMCA Notices
                </h2>
                <p className="mb-4 leading-relaxed text-gray-600">
                  If you believe that your copyrighted work has been copied in a
                  way that constitutes copyright infringement, please provide
                  our copyright agent with the following information:
                </p>
                <div className="space-y-3 rounded-xl bg-gray-50 p-6">
                  {[
                    "A description of the copyrighted work",
                    "A description of where the material is located on our service",
                    "Your contact information",
                    "A statement of good faith belief",
                    "A statement of accuracy under penalty of perjury",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <p className="text-gray-600">{item}</p>
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
