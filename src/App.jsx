import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { VideoProvider } from "./context/VideoContext";
import { Toaster } from "react-hot-toast";

// Lazy load pages for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const Copyright = lazy(() => import("./pages/Copyright"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load time for smoother transition
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadTimeout);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <VideoProvider>
      <BrowserRouter>
        <RouteBasedTitleUpdater />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="copyright" element={<Copyright />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </VideoProvider>
  );
}

// Update document title based on current route
function RouteBasedTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const defaultTitle = "SaveYT | Free YouTube to MP3 Converter";
    let newTitle = defaultTitle;

    switch (location.pathname) {
      case "/":
        // Homepage handles its own title
        return;
      case "/contact":
        newTitle = "Contact Us - SaveYT";
        break;
      case "/copyright":
        newTitle = "Copyright Information - SaveYT";
        break;
      case "/privacy":
        newTitle = "Privacy Policy - SaveYT";
        break;
      case "/terms":
        newTitle = "Terms and Conditions - SaveYT";
        break;
    }

    document.title = newTitle;
  }, [location]);

  return null;
}

export default App;
