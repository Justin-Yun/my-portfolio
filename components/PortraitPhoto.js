import Image from "next/image";

const PortraitPhoto = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-72 h-72 rounded-full overflow-hidden bg-white">
          <Image
            src="/images/JustinsProfile.jpg"
            alt="Portfolio photo"
            fill
            sizes="(max-width: 768px) 240px, 288px"
            className="rounded-full object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PortraitPhoto;
