import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbEye, TbEyeClosed, TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { useSignUp } from "./useSignUp";

const Input = tw.input`
px-2
py-1
border
ring-2
outline-none
text-black
text-lg
w-64

bg-neutral-200

rounded-md

md:w-72


`;

const StyledButton1 = tw.button`
w-full

text-xl
text-black
font-medium

bg-amber-400
rounded-md
shadow-lg

duration-300
ease-out

px-2
py-1

md:px-4
md:py-2
`;

const StyledButton2 = tw.button`
text-xl
text-black
font-medium

bg-amber-500
rounded-md
shadow-lg


duration-300
ease-out

px-2
py-1

md:px-4
md:py-2
`;

const Alert = tw.p`
text-sm
bg-red-500
text-red-100
p-0.5
font-medium
tracking-wide
border-b-4
border-amber-500

`;

function SignUpAuth() {
  const navigate = useNavigate();

  const { signUp, isLoading } = useSignUp();

  const [isHidden, setIsHidden] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    signUp(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <Alert role="alert">{errors.username.message}</Alert>
          )}

          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <Alert role="alert">{errors.email.message}</Alert>}

          <div className="flex items-center justify-between">
            <Input
              placeholder="Password"
              type={isHidden ? "password" : "text"}
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be (6 characters) or more",
                },
              })}
              disabled={isLoading}
            />
            <span
              className="absolute right-24"
              onClick={() => setIsHidden((hidden) => !hidden)}
            >
              {!isHidden ? (
                <TbEye size={34} className=" text-neutral-600" />
              ) : (
                <TbEyeClosed size={34} className="text-neutral-600" />
              )}
            </span>
          </div>
          {errors.password && (
            <Alert role="alert">{errors.password.message}</Alert>
          )}

          <Input
            placeholder="Re-Enter your password"
            type={isHidden ? "password" : "text"}
            {...register("passwordConfirm", {
              required: "Please re-enter your password",
              validate: (value) =>
                getValues().password === value || "Password need to match",
            })}
          />
          {errors.passwordConfirm && (
            <Alert role="alert">{errors.passwordConfirm.message}</Alert>
          )}
        </div>

        <div className="mb-4 mt-8 flex gap-4 ">
          <StyledButton1
            type="submit"
            className="hover:bg-amber-400 active:scale-95"
          >
            {isLoading ? (
              <TbFidgetSpinner size={28} className="mx-auto animate-spin" />
            ) : (
              "Create account"
            )}
          </StyledButton1>
        </div>
      </form>
      <p className="opacity-90">Already have account?</p>
      <StyledButton2
        onClick={() => navigate("/login")}
        className="hover:bg-amber-400 active:scale-95"
      >
        Login
      </StyledButton2>
    </>
  );
}

export default SignUpAuth;
