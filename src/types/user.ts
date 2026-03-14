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

interface SignInResponse {
  data: {
    email: string;
    id: number;
    role: number;
    username: string;
  };
  error: null | string;
  message: string;
  success: boolean;
}

export { FormSignIn, FormSignUp, Response, SignInResponse };
