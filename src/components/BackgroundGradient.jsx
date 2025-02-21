import { motion } from "framer-motion";

export const BackgroundGradient = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="fixed inset-0 -z-10"
  >
    <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
  </motion.div>
);
