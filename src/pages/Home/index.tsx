import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import CarCard from "../../components/CarCard";
import Button from "../../components/Button";
import carsService from "../../services/carsService";
import type { CarProps } from "../../types/car";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [carName, setCarName] = useState("");
  const [carList, setCarList] = useState<CarProps[]>([]);
  const [carImageList, setImageCarList] = useState<string[]>([]);

  useEffect(() => {
    carsService
      .listAllCars()
      .then((carList) => {
        if (carList) {
          setCarList(carList);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOnLoad = (carId: string) => {
    setImageCarList((list) => [...list, carId]);
  };

  return (
    <div className="pb-8">
      {loading && (
        <Spin
          fullscreen
          indicator={
            <LoadingOutlined
              spin
              style={{ fontSize: "52px", color: "#e11138" }}
            />
          }
        />
      )}

      <section className="bg-white w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-center gap-4 px-4 py-5 mb-12 rounded-lg">
        <input
          id="carName"
          name="carName"
          placeholder="Digite o nome do carro..."
          className="py-3 px-4 placeholder:text-input-border outline-none w-full border-1 border-input-border rounded-lg"
          value={carName}
          onChange={(ev) => setCarName(ev.target.value)}
        />

        <Button type="button" classStyle="bg-danger px-8">
          Buscar
        </Button>
      </section>

      <h1 className="text-center font-bold mb-4 text-lg sm:text-xl">
        Carros novos e usados em todo o Brasil
      </h1>

      <section className="grid gap-8 justify-items-center sm:justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {carList.map((car) => (
          <Link
            to={`/car-details/${car.id}`}
            className="flex flex-col w-full group"
          >
            <CarCard
              key={car.id}
              {...car}
              imageLoaded={carImageList.includes(car.id)}
              onLoad={() => handleOnLoad(car.id)}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
