import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../utils/dataPoster";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      if (res) {
        toast.success("Login Successful!");
        Cookies.set("token", res.token);
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    },
    onError: (error) => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error("An error occurred while logging in.");
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    mutate({
      u_email: data.u_email,
      u_password: data.u_password,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row select-none">
        {/* left image section */}
        <img
          src="/images/1.png"
          alt="doc image"
          className="h-1/3 w-full md:w-1/2 object-cover md:h-screen pointer-events-none"
          loading="lazy"
        />

        {/* left section */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[70%] flex flex-col items-center justify-center gap-y-6 rounded-sm shadow-lg p-10">
            <img
              src="/images/doctalks.png"
              alt="logo"
              className="pointer-events-none"
              height={100}
              width={300}
            />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Enter email</span>
              </div>
              <input
                type="text"
                name="u_email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("u_email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a Valid Email",
                  },
                })}
                disabled={isPending}
              />
              {errors.u_email && (
                <div className="text-red-500 mx-2 my-1">
                  {errors.u_email.message}
                </div>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Enter password</span>
              </div>
              <input
                type="password"
                name="u_password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                {...register("u_password", {
                  required: "Password is Required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 8 characters",
                  },
                })}
                disabled={isPending}
              />
              {errors.u_password && (
                <div className="text-red-500 mx-2 my-1">
                  {errors.u_password.message}
                </div>
              )}
            </label>
            <button
              disabled={isPending}
              type="submit"
              className="btn btn-primary w-full"
            >
              {isPending && <span className="loading loading-spinner" />}
              Login
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don&apos;t have an account?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
