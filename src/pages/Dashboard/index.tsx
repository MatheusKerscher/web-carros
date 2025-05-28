import { useContext, useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import CarCard from "../../components/CarCard";
import type { CarProps } from "../../types/car";
import carsService from "../../services/carsService";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [carList, setCarList] = useState<CarProps[]>([]);
  const [carImageList, setImageCarList] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    carsService
      .listUserCars(user)
      .then((carList) => {
        if (carList) {
          setCarList(carList);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

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

      <section className="mt-8 grid gap-8 justify-items-center sm:justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {carList.map((car) => (
          <CarCard
            key={car.id}
            {...car}
            imageLoaded={carImageList.includes(car.id)}
            onLoad={() => handleOnLoad(car.id)}
            buttons
          />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
