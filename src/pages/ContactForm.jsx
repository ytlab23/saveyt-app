import { useState } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { BackgroundGradient } from "../components/BackgroundGradient";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent successfully!", {
      icon: "🚀",
      style: {
        borderRadius: "12px",
        background: "#28a745",
        color: "#fff",
      },
    });
    setFormData({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundGradient />
      <Header />
      <main className="flex-1 pb-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl px-6"
        >
          <div className="mb-16 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-5xl font-bold text-transparent">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-lg text-lg text-gray-700">
              Have a question, feedback, or just want to say hello? <br />
              We&apos;d love to hear from you.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl transition-all duration-300 hover:shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 px-5 py-3.5 pl-11 transition-all duration-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 px-5 py-3.5 pl-11 transition-all duration-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="min-h-[120px] w-full rounded-xl border border-gray-300 px-5 py-3.5 pl-11 transition-all duration-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3.5 text-base font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-75"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
