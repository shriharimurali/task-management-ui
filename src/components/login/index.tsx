import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import { Action, Input } from "components/general";
import { LoginPayload, login } from "api/auth";

export const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (formData: LoginPayload) => {
    const res = await login(formData);
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
          type="password"
          leftIcon="/icons/password.svg"
          formState={formState}
          placeHolder="Password"
          {...register("password")}
        />

        <Action text="Log in" />
      </form>
      <p>
        Not a member a yet?{" "}
        <span className="font-bold text-violet-500">
          <Link to={"/sign-up"}>Register here</Link>
        </span>
      </p>
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
