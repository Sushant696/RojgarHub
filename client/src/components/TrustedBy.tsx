// Temporary logo data
const logos = [
  { id: 1, name: "Company A", src: "https://via.placeholder.com/100?text=A" },
  { id: 2, name: "Company B", src: "https://via.placeholder.com/100?text=B" },
  { id: 3, name: "Company C", src: "https://via.placeholder.com/100?text=C" },
  { id: 4, name: "Company D", src: "https://via.placeholder.com/100?text=D" },
  { id: 5, name: "Company E", src: "https://via.placeholder.com/100?text=E" },
  { id: 6, name: "Company F", src: "https://via.placeholder.com/100?text=F" },
  { id: 7, name: "Company G", src: "https://via.placeholder.com/100?text=G" },
];

const TrustedBy = () => {
  return (
    <div className="p-3 bg-white  text-center section-margin">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trusted By</h2>

      <div className="flex justify-around gap-4 mb- 10 container">
        {logos.slice(0, 7).map((logo) => (
          <div
            key={logo.id}
            className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
