import { ProjectSvg } from "@/components/svg";
import { TrendingCoins } from "@/config/api/api";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CryptoState } from "./market/CryptoContext";
import { numberWithCommas } from '@/utils/NumberWithCommas'

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="conteact-next c-pointer" onClick={onClick}>
      <i className="las la-long-arrow-alt-right" />
    </div>
  );
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);


  const settings = {
    slidesToShow: 3,
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
    nextArrow: <SampleNextArrow />,
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
    <>
      <Slider {...settings}>
        {
          trending.map((coin) => {
            let profit = coin?.price_change_percentage_24h >= 0;
            return (

              <div className="items" key={coin.id}>
                <Link href={`/market-info/coins/${coin.id}`}>
                  <ProjectSvg image={coin.image} width={80} height={80} style={{ marginBottom: 10 }} />
                  <p style={{ textTransform: "uppercase" }}>
                    {coin?.symbol}
                    &nbsp;
                    <span
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500
                      }}
                    >
                      {profit && "+"}
                      {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </p>
                  <span style={{ fontSize: 18, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                  </span>
                </Link>
              </div>
            )

          })
        }

      </Slider>
    </>
  );
};

export default Carousel;
