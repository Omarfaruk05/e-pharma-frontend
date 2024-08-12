import Image from "next/image";
import barrer1 from "../../assects/banner/Content-1.webp";

const Banner = () => {
  return (
    <div>
      <Image
        className="rounded-xl"
        width={1900}
        height={500}
        src={barrer1}
        alt="banner-1"
      />
    </div>
  );
};

export default Banner;
