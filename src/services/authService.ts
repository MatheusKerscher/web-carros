import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseAuthSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../common/config/firebase";
import { toast } from "react-toastify";

const authService = {
  registerUser: async (
    fullName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    let successRegister = false;

    successRegister = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then(async (response) => {
        await updateProfile(response.user, {
          displayName: fullName,
        });

        toast.success("Cadastro realizado!! Seja bem-vindo(a)");

        return true;
      })
      .catch(() => {
        toast.error(
          "Erro ao realizar cadastro. Verifique os dados informados e tente novamente"
        );

        return false;
      });

    return successRegister;
  },
  signIn: async (email: string, password: string): Promise<boolean> => {
    let successSignIn = false;

    successSignIn = await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        toast.success(`Olá, ${response.user.displayName}!`);

        return true;
      })
      .catch(() => {
        toast.error(
          "Erro ao acessar. Verifique os dados informados e tente novamente"
        );

        return false;
      });

    return successSignIn;
  },
  signOut: async () => {
    await firebaseAuthSignOut(auth)
  }
};

export default authService;
