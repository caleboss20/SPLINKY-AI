export default function WaveTypingIndicator() {
  return (
    <>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <div className="flex items-end justify-center space-x-1 h-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1 h-4 bg-gradient-to-t from-black to-gray-700 rounded"
            style={{
              animation: `wave 1s infinite ease-in-out`,
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}