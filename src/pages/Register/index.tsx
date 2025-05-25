import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .nonempty("O nome completo é obrigatório"),
  email: z
    .string()
    .email("Insira um e-mail válido")
    .nonempty("O e-mail é obrigatório"),
  password: z
    .string()
    .trim()
    .min(6, "A senha deve contem pelo menos 6 caracteres")
    .nonempty("A senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center px-4">
      <Logo />

      <div className="mt-10 bg-white rounded-lg px-4 py-7 w-full max-w-2xl drop-shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="fullName"
            type="text"
            placeholder="Digite o nome completo..."
            error={errors.fullName?.message}
            register={register}
          />

          <InputField
            name="email"
            type="email"
            placeholder="Digite o e-mail..."
            error={errors.email?.message}
            register={register}
          />

          <InputField
            name="password"
            type="password"
            placeholder="Digite a senha..."
            error={errors.password?.message}
            register={register}
          />

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
      </div>

      <p className="text-center mt-4">
        Já possui uma conta?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Faça login
        </Link>
      </p>
    </section>
  );
};

export default Register;
