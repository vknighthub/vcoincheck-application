import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SliderSlice = ({ children }) => {

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        infinite: true,
        touchMove: true,
        className: "contacts-card",
        centerPadding: "60px",
        speed: 100,
        accessibility: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerPadding: 0,
                    centerMode: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: 0,
                    centerMode: false,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            <div className="items">
                <div>
                    {children}
                </div>
            </div>
        </Slider>
    );
};

export default SliderSlice;
