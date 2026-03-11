interface FormSignUp {
  username: string;
  email: string;
  password: string;
}

interface FormSignIn {
  email: string;
  password: string;
}

interface Response {
  data: [];
  error: null | string;
  message: string;
  success: boolean;
}

export { FormSignIn, FormSignUp, Response };
