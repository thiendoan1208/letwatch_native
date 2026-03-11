import axios from "@/config/axios";
import { FormSignIn, FormSignUp, Response } from "@/types/user";

const signUp = async (form: FormSignUp): Promise<Response> => {
  try {
    const user = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL_ANDROID}/api/auth/sign-up`,
      form,
    );
    return user.data;
  } catch (error) {
    throw error;
  }
};

const signIn = async (form: FormSignIn): Promise<Response> => {
  try {
    const user = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL_ANDROID}/api/auth/sign-in`,
      form,
    );
    return user.data;
  } catch (error) {
    throw error;
  }
};


export { signUp, signIn };
