const HomeClipPath = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-40">
      <svg
        className="absolute bottom-0 right-0 w-3/5 h-full" // Changed to h-4/5 for taller height
        viewBox="0 0 800 1000"
        preserveAspectRatio="none"
      >
        <path
          d="M800,0 L800,1000 L0,1000 C200,900 400,800 600,850 C700,870 750,850 800,820 L800,0 Z"
          fill="rgba(186, 230, 253, 0.3)"
        />
        <path
          d="M800,200 L800,1000 L200,1000 C400,950 600,870 800,920 L800,200 Z"
          fill="rgba(125, 211, 252, 0.25)"
        />
        <path
          d="M800,400 L800,1000 L400,1000 C600,950 700,900 800,940 L800,400 Z"
          fill="rgba(56, 189, 248, 0.2)"
        />
      </svg>
    </div>
  );
};

export default HomeClipPath;
