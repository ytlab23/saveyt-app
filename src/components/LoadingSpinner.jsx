// LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md">
      <div className="relative">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500"></div>

        <div
          className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-b-purple-500" // Larger spinner and updated colors
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}
