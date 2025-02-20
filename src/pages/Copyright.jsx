import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Copyright() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Copyright Information
          </h1>
          <div className="prose prose-indigo">
            <h2>Copyright Policy</h2>
            <p>
              SaveYT respects the intellectual property rights of others and
              expects its users to do the same. In accordance with the Digital
              Millennium Copyright Act of 1998, we will respond expeditiously to
              claims of copyright infringement.
            </p>
            <h2>DMCA Notices</h2>
            <p>
              If you believe that your copyrighted work has been copied in a way
              that constitutes copyright infringement, please provide our
              copyright agent with the following information:
            </p>
            <ul>
              <li>A description of the copyrighted work</li>
              <li>
                A description of where the material is located on our service
              </li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>A statement of accuracy under penalty of perjury</li>
            </ul>
            {/* Add more copyright content as needed */}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
