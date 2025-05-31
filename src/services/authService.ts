import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseAuthSignOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth";
import { auth } from "../common/config/firebase";
import { toast } from "react-toastify";

const authService = {
  registerUser: async (
    fullName: string,
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, {
        displayName: fullName,
      });
      toast.success("Cadastro realizado!! Seja bem-vindo(a)");
      return response;
    } catch {
      toast.error(
        "Erro ao realizar cadastro. Verifique os dados informados e tente novamente"
      );

      return null;
    }
  },
  signIn: async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Olá, ${response.user.displayName}!`);
      return response;
    } catch {
      toast.error(
        "Erro ao acessar. Verifique os dados informados e tente novamente"
      );

      return null;
    }
  },
  signOut: async () => {
    await firebaseAuthSignOut(auth);
  },
};

export default authService;
