import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload } from "react-icons/fi";
import { useRef } from "react";

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
  year: z.string().trim().length(4, "O ano do carro deve ser no formato yyyy"),
  mileage: z.string().nonempty("A quilometragem é obrigatória"),
  price: z.number().gt(0, "O preço deve ser maior que zero"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().nonempty("O WhatsApp é obrigatório"),
  description: z.string().nonempty("A descrição do é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const CarForm = () => {
  const inputImageRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const saveCar = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <section className="w-full rounded-lg bg-white p-4 mt-8 flex flex-col sm:flex-row items-center gap-2">
        <button 
          className="border-1 border-input-border rounded-lg w-48 h-32 flex justify-center items-center cursor-pointer"
          onClick={() => inputImageRef.current?.click()}  
        >
          <div>
            <FiUpload size={28} />
          </div>

          <div className="hidden">
            <input ref={inputImageRef} type="file" accept="image/*" />
          </div>
        </button>
      </section>

      <section className="w-full rounded-lg bg-white px-4 py-5 mt-4 drop-shadow-lg">
        <form onSubmit={handleSubmit(saveCar)} className="flex flex-col gap-5">
          <InputField
            name="carName"
            type="text"
            label="Nome do carro"
            placeholder="Nome do carro..."
            register={register}
            error={errors.carName?.message}
          />

          <InputField
            name="model"
            type="text"
            label="Modelo"
            placeholder="Modelo do carro..."
            register={register}
            error={errors.model?.message}
          />

          <div className="flex flex-col sm:flex-row gap-5">
            <InputField
              name="year"
              type="text"
              label="Ano"
              placeholder="Ano de fabricação..."
              containerClassStyle="flex-1"
              register={register}
              error={errors.year?.message}
            />

            <InputField
              name="miliage"
              type="text"
              label="Km rodados"
              placeholder="Km rodados..."
              containerClassStyle="flex-1"
              register={register}
              error={errors.mileage?.message}
            />
          </div>

          <InputField
            name="price"
            type="number"
            label="Valor em R$"
            placeholder="Valor do carro..."
            register={register}
            error={errors.price?.message}
          />

          <InputField
            name="city"
            type="text"
            label="Cidade"
            placeholder="Sua cidade..."
            register={register}
            error={errors.city?.message}
          />

          <InputField
            name="whatsapp"
            type="text"
            label="WhatsApp"
            placeholder="Seu número de WhatsApp..."
            containerClassStyle="w-full sm:w-5/12"
            register={register}
            error={errors.whatsapp?.message}
          />

          <div>
            <label className="font-bold block mb-1" htmlFor="description">
              Descrição
            </label>

            <textarea
              id="description"
              placeholder="Descrição do carro..."
              rows={4}
              {...register("description")}
              className="py-2 px-3 placeholder:text-input-border outline-none w-full border-1 border-input-border rounded-lg"
            />
          </div>

          <Button
            type="submit"
            classStyle={`w-full bg-black ${
              isValid ? "cursor-pointer" : "opacity-70 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Cadastrar
          </Button>
        </form>
      </section>
    </div>
  );
};

export default CarForm;
