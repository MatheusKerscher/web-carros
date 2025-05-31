import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiTrash, FiUpload } from "react-icons/fi";
import { z } from "zod";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { AuthContext } from "../../../context/AuthContext";
import carsService from "../../../services/carsService";
import type { CarImageData } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const schema = z.object({
  carName: z
    .string()
    .trim()
    .min(3, "O nome do carro deve conter pelo menos 3 caracteres")
    .nonempty("O nome do carro é obrigatório"),
  model: z
    .string()
    .trim()
    .min(3, "O modelo do carro deve conter pelo menos 3 caracteres")
    .nonempty("O modelo do carro é obrigatório"),
  year: z
    .string()
    .trim()
    .min(4, "O ano deve conter pelo menos 4 caracteres")
    .nonempty("O ano do carro é obrigatório"),
  mileage: z.string().nonempty("A quilometragem é obrigatória"),
  price: z.coerce.number().gt(0, "O preço deve ser maior que zero"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .nonempty("O WhatsApp é obrigatório")
    .refine((value) => /^(\d{10,11})$/.test(value), {
      message: "Número de telefone inválido",
    }),
  description: z.string().nonempty("A descrição do é obrigatória"),
});

export type FormData = z.infer<typeof schema>;

const CarForm = () => {
  const { user } = useContext(AuthContext);
  const { carId } = useParams();
  const navigate = useNavigate();

  const inputImageRef = useRef<HTMLInputElement>(null);
  const [carImages, setCarImages] = useState<CarImageData[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (carId) {
      setLoading(true);

      carsService
        .getCarDetails(carId, user?.uid)
        .then((carData) => {
          if (carData) {
            reset({
              carName: carData.carName,
              model: carData.model,
              year: carData.year,
              mileage: carData.mileage,
              price: carData.price,
              city: carData.city,
              whatsapp: carData.whatsapp,
              description: carData.description,
            });

            setCarImages(
              carData.images.map((i) => ({
                name: i.name,
                uid: i.uid,
                previewUrl: i.url,
                file: null,
              }))
            );
          } else {
            toast.error(
              "Não foi possível encontrar o carro. Por favor, tente novamente mais tarde"
            );
            navigate("/dashboard");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      reset({
        carName: "",
        model: "",
        year: "",
        mileage: "",
        price: undefined,
        city: "",
        whatsapp: "",
        description: "",
      });
      setCarImages([])
    }
  }, [carId, user, navigate, reset]);

  const handleFile = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!user?.uid) {
      return;
    }

    if (ev.target.files && ev.target.files[0]) {
      const image = ev.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setCarImages((images) => [
          ...images,
          {
            file: image,
            previewUrl: URL.createObjectURL(image),
          },
        ]);
      } else {
        toast.warning("Por favor, envie somente imagens do tipo jpeg ou png");
      }
    }
  };

  const handleDeleteImage = (image: CarImageData) => {
    setCarImages(
      carImages.filter((carImage) => carImage.previewUrl !== image.previewUrl)
    );
  };

  const saveCar = async (data: FormData) => {
    if (!user?.uid) {
      return;
    }

    if (carImages.length === 0) {
      toast.warning("Você deve selecionar pelo menos uma foto do carro");
      return;
    }

    setLoading(true);

    const success = carId
      ? await carsService.updateCarWithImages(user, data, carImages, carId)
      : await carsService.createCar(user, data, carImages);

    if (success) {
      reset();
      setCarImages([]);
      toast.success("Carro salvo com sucesso");
    }

    setLoading(false);
  };

  return (
    <div>
      {loading && <Spinner />}

      <section className="w-full rounded-lg bg-white p-4 mt-8 flex flex-col sm:flex-row items-center gap-2">
        <button
          className="border-1 border-input-border rounded-lg w-48 h-32 flex justify-center items-center cursor-pointer"
          onClick={() => inputImageRef.current?.click()}
        >
          <div>
            <FiUpload size={28} />
          </div>

          <div className="hidden">
            <input
              ref={inputImageRef}
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map((image) => (
          <div key={image.previewUrl} className="relative group">
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg z-10" />

            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
              onClick={() => handleDeleteImage(image)}
            >
              <FiTrash size={22} color="#ffffff" />
            </button>

            <img
              src={image.previewUrl}
              alt="Foto do carro"
              className="w-full h-32 rounded-lg object-cover"
            />
          </div>
        ))}
      </section>

      <section className="w-full rounded-lg bg-white px-4 py-5 mt-4 drop-shadow-lg">
        <form onSubmit={handleSubmit(saveCar)} className="flex flex-col gap-5">
          <InputField
            name="carName"
            type="text"
            label="Nome do carro"
            placeholder="Ex.: Duster"
            register={register}
            error={errors.carName?.message}
          />

          <InputField
            name="model"
            type="text"
            label="Modelo"
            placeholder="Ex.: 2.0 flex automática"
            register={register}
            error={errors.model?.message}
          />

          <div className="flex flex-col sm:flex-row gap-5">
            <InputField
              name="year"
              type="text"
              label="Ano"
              placeholder="Ex: 2023/2024"
              containerClassStyle="flex-1"
              register={register}
              error={errors.year?.message}
            />

            <InputField
              name="mileage"
              type="text"
              label="Km rodados"
              placeholder="Ex: 12450"
              containerClassStyle="flex-1"
              register={register}
              error={errors.mileage?.message}
            />
          </div>

          <InputField
            name="price"
            type="number"
            label="Valor em R$"
            placeholder="Ex: 100.000"
            register={register}
            error={errors.price?.message}
          />

          <div className="flex flex-col sm:flex-row gap-5">
            <InputField
              name="city"
              type="text"
              label="Cidade"
              placeholder="Ex.: São Paulo - SP"
              containerClassStyle="flex-1"
              register={register}
              error={errors.city?.message}
            />

            <InputField
              name="whatsapp"
              type="tell"
              label="WhatsApp"
              placeholder="Ex: 11995867324"
              containerClassStyle="flex-1"
              register={register}
              error={errors.whatsapp?.message}
            />
          </div>

          <div>
            <label className="font-bold block mb-1" htmlFor="description">
              Descrição
            </label>

            <textarea
              id="description"
              placeholder="Descrição completa do carro..."
              rows={4}
              {...register("description")}
              className="py-2 px-3 placeholder:text-input-border outline-none w-full border-1 border-input-border rounded-lg"
            />

            {errors.description && (
              <span className="text-xs text-danger font-medium">
                {errors.description.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            classStyle={`w-full bg-black ${
              isValid ? "cursor-pointer" : "opacity-70 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            {carId ? "Atualizar" : "Cadastrar"}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default CarForm;
