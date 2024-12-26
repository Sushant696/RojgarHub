// Temporary logo data
const logos = [
  { id: 1, name: "Company", src: "https://via.placeholder.com/100?text=A" },
  { id: 2, name: "Company", src: "https://via.placeholder.com/100?text=B" },
  { id: 3, name: "Company", src: "https://via.placeholder.com/100?text=C" },
  { id: 4, name: "Company", src: "https://via.placeholder.com/100?text=D" },
  { id: 5, name: "Company", src: "https://via.placeholder.com/100?text=E" },
  { id: 6, name: "Company", src: "https://via.placeholder.com/100?text=F" },
  { id: 7, name: "Company", src: "https://via.placeholder.com/100?text=G" },
];

const TrustedBy = () => {
  return (
    <div className="p-4 bg-white  text-center section-margin">
      <h2 className="subtitle-text font-bold text-gray-800 mb-4 title-margin">
        Trusted By
      </h2>

      <div className="flex justify-around gap-4 mb- 10 container">
        {logos.slice(0, 7).map((logo) => (
          <div
            key={logo.id}
            className="w-36 h-16 border flex items-center justify-center bg-white  shadow-sm hover:shadow-md transition-shadow"
          >
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
