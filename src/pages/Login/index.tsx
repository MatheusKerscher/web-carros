import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import { useEffect, useState } from "react";
import authService from "../../services/authService";

const schema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido")
    .nonempty("O e-mail é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    authService.signOut();
  }, []);

  const onSubmit = (data: FormData) => {
    setLoading(true);

    authService
      .signIn(data.email, data.password)
      .then((success) => {
        if (success) {
          navigate("/dashboard", { replace: true });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center px-4">
      <Logo />

      <div className="mt-10 bg-white rounded-lg px-4 py-7 w-full max-w-2xl drop-shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            type="email"
            placeholder="Digite seu e-mail..."
            error={errors.email?.message}
            register={register}
          />

          <InputField
            name="password"
            type="password"
            placeholder="Digite sua senha..."
            error={errors.password?.message}
            register={register}
          />

          <Button
            type="submit"
            classStyle={`w-full bg-black ${
              isValid ? "cursor-pointer" : "opacity-70 cursor-not-allowed"
            }`}
            disabled={!isValid}
            loading={loading}
          >
            Acessar
          </Button>
        </form>
      </div>

      <p className="text-center mt-4">
        Ainda não possui uma conta?{" "}
        <Link to="/register" className="text-blue-400 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </section>
  );
};

export default Login;
