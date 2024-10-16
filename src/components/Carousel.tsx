import "../styles/styleCarousel.css";
import Picture01 from "../assets/images/Picture01.jpeg";
import Picture02 from "../assets/images/Picture02.jpg";
import Picture03 from "../assets/images/Picture03.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";


const images = [Picture01, Picture02, Picture03];

const Carousel: React.FC = () => {

    const [slideImages, setSlideImages] = useState<number>(0);

    const goToNext = () => {
        setSlideImages((prevImage) => (prevImage + 1)%images.length);
    }
    const goToPrevious = () => {
        setSlideImages((prevImage) => (prevImage - 1 + images.length)%images.length);
    }

    return (
        <div className="containerImages">
            <button className = "buttonArrowLeft" onClick={goToPrevious}>
                <FontAwesomeIcon icon={faCircleArrowLeft}/>
            </button> 
            <div className="slideImages">
                <img src={images[slideImages]} className="imageBanner" />
            </div>
            <button className = "buttonArrowRigth" onClick={goToNext}>
                <FontAwesomeIcon icon={faCircleArrowRight}/>
            </button>
        </div>
    );
};

export default Carousel;