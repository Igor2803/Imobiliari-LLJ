import { Carousel } from "react-responsive-carousel";
import Banner1 from "../assets/banner1.png";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.png";
import { Link } from "react-router-dom";


export default function BannerCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={600}
      >
         <Link to="/contato">
        <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]">
          <img
            src={Banner1}
            alt="Banner 1"
            className="h-full w-full object-cover"
          />
        </div>
        </Link>

        <Link to="/buscar">
        <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]">
          <img
            src={Banner2}
            alt="Banner 2"
            className="h-full w-full object-cover"
          />
        </div>
        </Link>

        <Link to="/ajuda">
        <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]">
          <img
            src={Banner3}
            alt="Banner 3"
            className="h-full w-full object-cover"
          />
        </div>
        </Link>
      </Carousel>
    </div>
  );
}
