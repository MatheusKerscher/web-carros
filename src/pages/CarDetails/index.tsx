import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";

import type { CarDetailsProps } from "../../types/car";
import { AuthContext } from "../../context/AuthContext";

import carsService from "../../services/carsService";
import brazilianCurrencyFormatter from "../../utils/brazilianCurrencyFormatter";
import brazilianDecimalFormatter from "../../utils/brazilianDecimalFormatter";
import Spinner from "../../components/Spinner";

const iconProps = {
  size: 14,
  color: "878787",
};

import "swiper/css";
import "swiper/css/navigation";

const CarDetails = () => {
  const { user } = useContext(AuthContext);
  const { carId } = useParams();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState<CarDetailsProps>();
  const [slidesPerView, setSlidesPerView] = useState(2);

  useEffect(() => {
    if (carId) {
      carsService.getCarDetails(carId).then((car) => {
        if (car) {
          setCarDetails(car);
        } else {
          toast.warning("Carro não encontrado");
          navigate("/");
        }
      });
    } else {
      toast.warning("Carro não encontrado");
      navigate("/");
    }
  }, [carId, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!carDetails) {
    return <Spinner />;
  }

  return (
    <>
      <section className="w-full rounded-lg">
        <Swiper
          slidesPerView={slidesPerView}
          navigation
          loop
          modules={[Navigation, Autoplay]}
        >
          {carDetails.images.map((image) => (
            <SwiperSlide key={image.url}>
              <img
                className="w-full h-96 object-cover rounded-lg sm:rounded-none"
                src={image.url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mt-6 bg-white rounded-lg p-6">
        <div className="w-full flex flex-col xsm:flex-row xsm:justify-between gap-2">
          <h2 className="text-center text-lg sm:text-xl font-bold">
            {carDetails.carName}
          </h2>

          <h2 className="text-center text-lg sm:text-xl font-bold">
            {brazilianCurrencyFormatter(carDetails.price)}
          </h2>
        </div>

        <p className="mt-2">{carDetails.model}</p>

        <div className="flex flex-wrap gap-8 my-7">
          <div>
            <span className="flex gap-2 text-sm items-center">
              Ano <IoCalendarClearOutline {...iconProps} />
            </span>

            <p className="font-semibold text-sm mt-1">{carDetails.year}</p>
          </div>

          <div>
            <span className="flex gap-2 text-sm items-center">
              Quilometragem <IoSpeedometerOutline {...iconProps} />
            </span>

            <p className="font-semibold text-sm mt-1">
              {brazilianDecimalFormatter(Number(carDetails.mileage))} km
            </p>
          </div>

          <div>
            <span className="flex gap-2 text-sm items-center">
              Cidade <IoLocationOutline {...iconProps} />
            </span>

            <p className="font-semibold text-sm mt-1">{carDetails.city}</p>
          </div>
        </div>

        <div className="mb-6">
          <span className="font-semibold">Descrição</span>

          <p className="text-sm text-justify mt-1">{carDetails.description}</p>
        </div>

        <a
          href={`https://wa.me/${carDetails.whatsapp}?text=${encodeURIComponent(
            `Olá ${user?.name}! Gostaria de falar sobre o carro ${carDetails.carName} que vi no site da WebCarros`
          )}`}
          rel="noopener noreferrer"
          target="_blank"
          type="button"
          className="bg-green text-white rounded-lg py-2 w-full cursor-pointer flex gap-2 items-center justify-center text-base"
        >
          Enviar WhatsApp
          <FaWhatsapp size={20} />
        </a>
      </section>
    </>
  );
};

export default CarDetails;
