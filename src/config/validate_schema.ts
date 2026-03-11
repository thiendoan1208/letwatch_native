import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().trim().email("Invalid email").required("Required"),
});
