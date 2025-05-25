import { Link } from "react-router-dom";
import image from "./img-template.png";

const CarCard = () => {
  return (
    <div className="bg-white rounded-lg max-w-[400px]">
      <Link to="" className="flex flex-col w-full">
        <img
          src={image}
          alt="Carro"
          className="rounded-t-lg w-full max-w-[400px] max-h-[280px] transition-all duration-150 hover:scale-104"
        />

        <div className="px-3 pb-2 pt-4">
          <h3 className="font-bold text-lg sm:text-xl">Jaguar F-Pace</h3>

          <div className="flex gap-3 mt-2 text-sm">
            <span>2019/2020 | 38.230 km</span>
          </div>

          <h4 className="font-bold text-xl sm:text-2xl mt-8">R$ 218.000,00</h4>
        </div>

        <div className="border-t-1 border-gray py-2">
          <p className="px-3 text-sm">Curitiba - PR</p>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
