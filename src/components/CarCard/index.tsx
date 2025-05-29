import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";

import type { CarProps } from "../../types/car";
import { FiTrash } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import { Link } from "react-router-dom";

const iconProps = {
  size: 18,
  color: "878787",
};

type CarCardProps = CarProps & {
  buttons?: boolean;
  imageLoaded: boolean;
  onLoad: () => void;
  onDelete?: () => void;
};

const CarCard = ({
  id,
  carName,
  year,
  price,
  city,
  mileage,
  images,
  imageLoaded,
  buttons = false,
  onLoad,
  onDelete,
}: CarCardProps) => {
  return (
    <div className="relative bg-white rounded-lg max-w-[400px]">
      {buttons && (
        <>
          <button
            type="button"
            className="absolute top-1 right-1 bg-white p-2 rounded-full flex items-center justify-center cursor-pointer"
            onClick={onDelete}
          >
            <FiTrash size={20} color="#121212" />
          </button>

          <Link
            to={`edit-car/${id}`}
            className="absolute top-12 right-1 bg-white p-2 rounded-full flex items-center justify-center cursor-pointer"
          >
            <TfiPencil size={20} color="#121212" />
          </Link>
        </>
      )}

      <div
        className={`rounded-t-lg w-full h-50 bg-gray ${
          imageLoaded ? "hidden" : "block"
        }`}
      ></div>

      <img
        src={images[0].url}
        alt="Carro"
        className={`rounded-t-lg w-full max-h-72 transition-all duration-200 group-hover:scale-104 ${
          imageLoaded ? "block" : "hidden"
        }`}
        onLoad={onLoad}
      />

      <div className="px-3 pb-2 pt-4">
        <h3 className="font-bold sm:text-lg">{carName}</h3>

        <div className="flex flex-col gap-1 mt-2 text-sm">
          <span className="flex gap-1">
            <IoCalendarClearOutline {...iconProps} />
            {year}
          </span>

          <span className="flex gap-1">
            <IoSpeedometerOutline {...iconProps} />
            {Number(mileage).toLocaleString("pt-BR", { style: "decimal" })} km
          </span>
        </div>

        <h4 className="font-bold text-lg sm:text-xl mt-6">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h4>
      </div>

      <div className="border-t-1 border-gray py-2 flex gap-1">
        <IoLocationOutline {...iconProps} className="ms-3" />

        <p className="text-sm pe-3">{city}</p>
      </div>
    </div>
  );
};

export default CarCard;
