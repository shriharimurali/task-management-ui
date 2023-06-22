import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { Action, Input } from "components/general";
import { login } from "api/auth";

export const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: { email: string; password: string }) => {
    const res = await login(data);
    if (res.accessToken) {
      reset();
      navigate("/dashboard");
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-Nunito text-4xl font-bold">
          Login to your Account
        </h1>
        <p className="font-Nunito text-base text-indigo-400 font-semibold">
          Welcome back! Select method to log in:
        </p>
      </div>

      <hr />
      <p className="font-Nunito font-semibold text-center">
        or continue with email
      </p>
      <hr />

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-5"
      >
        <Input
          leftIcon="/icons/email.svg"
          formState={formState}
          placeHolder="Email"
          {...register("email")}
        />

        <Input
          leftIcon="/icons/password.svg"
          formState={formState}
          placeHolder="Password"
          {...register("password")}
        />

        <Action text="Log in"></Action>
      </form>
    </div>
  );
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is Required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters")
    .required("Password id required"),
});
