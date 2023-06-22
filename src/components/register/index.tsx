import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { Action, Input } from "components/general";
import { RegisterPayload, signUp } from "api/auth";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (formData: RegisterPayload) => {
    const res = await signUp(formData);
    if (res) {
      reset();
      navigate("/");
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-Nunito text-4xl font-bold">Create your account</h1>
        <p className="font-Nunito text-base text-indigo-400 font-semibold">
          Register to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-5"
        >
          <Input
            leftIcon="/icons/email.svg"
            formState={formState}
            placeHolder="First Name"
            {...register("fname")}
          />

          <Input
            leftIcon="/icons/email.svg"
            formState={formState}
            placeHolder="Last Name"
            {...register("lname")}
          />

          <Input
            leftIcon="/icons/email.svg"
            formState={formState}
            placeHolder="Email"
            {...register("email")}
          />

          <Input
            type="password"
            leftIcon="/icons/email.svg"
            formState={formState}
            placeHolder="Password"
            {...register("password")}
          />
          <Action text="Register" />
        </form>
      </div>
    </div>
  );
};

const schema = yup.object().shape({
  fname: yup
    .string()
    .min(3, "Minium 3 characters required")
    .required("First Name is Required"),
  lname: yup
    .string()
    .min(3, "Minium 3 characters required")
    .required("Last Name is Required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is Required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters")
    .required("Password id required"),
});
