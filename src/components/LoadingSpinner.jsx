export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-600 rounded-full animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}
