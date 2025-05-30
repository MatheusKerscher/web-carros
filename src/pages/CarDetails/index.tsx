import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

import type { CarDetailsProps } from "../../types/car";
import carsService from "../../services/carsService";
import brazilianCurrencyFormatter from "../../utils/brazilianCurrencyFormatter";
import brazilianDecimalFormatter from "../../utils/brazilianDecimalFormatter";

const iconProps = {
  size: 14,
  color: "878787",
};

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState<CarDetailsProps>();

  useEffect(() => {
    if (carId) {
      carsService.getCarDetails(carId).then((car) => {
        console.log(car);
        if (car) {
          setCarDetails(car);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [carId, navigate]);

  if (!carDetails) {
    return (
      <Spin
        fullscreen
        indicator={
          <LoadingOutlined
            spin
            style={{ fontSize: "52px", color: "#e11138" }}
          />
        }
      />
    );
  }

  return (
    <>
      <section></section>

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
            `Olá! Gostaria de falar sobre o carro ${carDetails.carName}`
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
