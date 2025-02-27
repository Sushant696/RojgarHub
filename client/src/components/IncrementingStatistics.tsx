import { useEffect, useState } from "react";

const statistics = [
  { id: 1, label: "Jobs Available", value: 109282, icon: "📋" },
  { id: 2, label: "Companies", value: 7520, icon: "🏢" },
  { id: 3, label: "Job Seekers", value: 842615, icon: "👨‍💼" },
  { id: 4, label: "Placements Made", value: 56879, icon: "🤝" },
];

const IncrementingStatistics = () => {
  const [counts, setCounts] = useState(statistics.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts(
        statistics.map((stat) =>
          Math.floor(stat.value * Math.min(progress, 1)),
        ),
      );

      if (frame === totalFrames) {
        clearInterval(interval);
      }
    }, frameDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">
                {counts[index].toLocaleString()}
              </div>
              <div className="text-lg opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncrementingStatistics;
