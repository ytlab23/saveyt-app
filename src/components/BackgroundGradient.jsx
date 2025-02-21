export const BackgroundGradient = () => (
  <div className="fixed inset-0 -z-10 bg-white">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-60" />
    <div className="animate-gradient absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(99,102,241,0.5),transparent)]" />
    <div className="animate-gradient-slow absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,#c388f9,transparent)]" />
  </div>
);
