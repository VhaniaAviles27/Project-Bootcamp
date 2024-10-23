import "./styleCarousel.css";
import Banner01 from "../assets/images/iamgeBanner01.jpeg";
import Banner02 from "../assets/images/imageBanner02.jpg";
import Banner03 from "../assets/images/imageBanner03.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const imagesBanner = [Banner01, Banner02, Banner03];

const Carousel: React.FC = () => {
  const [slideImages, setSlideImages] = useState<number>(0);

  const goToNext = () => {
    setSlideImages((prevImage) => (prevImage + 1) % imagesBanner.length);
  };
  const goToPrevious = () => {
    setSlideImages(
      (prevImage) => (prevImage - 1 + imagesBanner.length) % imagesBanner.length
    );
  };

  return (
    <div className="containerImages">
      <button className="buttonArrowLeft" onClick={goToPrevious}>
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <div className="slideImages">
        <img src={imagesBanner[slideImages]} className="imageBanner" />
      </div>
      <button className="buttonArrowRigth" onClick={goToNext}>
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </button>
    </div>
  );
};

export default Carousel;
