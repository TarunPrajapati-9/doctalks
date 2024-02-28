import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import { useMutation } from "@tanstack/react-query";
// import { signUp } from "../utils/dataPoster";

const SignUp = () => {
  // const { mutate, isPending } = useMutation({
  //   mutationFn: signUp,
  //   onSuccess: (res) => {
  //     if (res.detail.status) {
  //       toast.success("Account Created Successfully!");
  //       localStorage.setItem("participant_token", res.detail.token);
  //       localStorage.setItem("participant_id", res.detail._id);
  //       navigate("/");
  //     }
  //   },
  //   onError: () => {
  //     toast.error("Invalid Credentials");
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const password = watch("u_password");

  const onSubmit = async (data) => {
    console.log(data);
    // mutate({
    //   u_name: data.u_name,
    //   u_email: data.u_email,
    //   u_password: data.u_password,
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row">
        {/* left image section */}
        <img
          src="/images/1.png"
          alt="doc image"
          className="h-1/3 w-full md:w-1/2 object-cover md:h-screen pointer-events-none"
          loading="lazy"
        />

        {/* Right section */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[70%] flex flex-col items-center justify-center gap-y-1 rounded-sm shadow-lg p-10">
            <img
              src="/images/doctalks.png"
              alt="logo"
              className="pointer-events-none mb-4"
              height={70}
              width={250}
            />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Enter Full Name</span>
              </div>
              <input
                type="text"
                name="u_name"
                placeholder="Enter your name"
                // disabled={isPending}
                className={`input input-bordered w-full ${
                  errors.u_name ? "input-error" : ""
                }`}
                {...register("u_name", { required: "Name is Required!" })}
              />
              {errors.u_name && (
                <div className="text-red-500 mx-2 my-1">
                  {errors.u_name.message}
                </div>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Enter Email</span>
              </div>
              <input
                type="text"
                name="u_email"
                placeholder="Enter your email"
                // disabled={isPending}
                className={`input input-bordered w-full ${
                  errors.u_email ? "input-error" : ""
                }`}
                {...register("u_email", {
                  required: "Email is Required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a Valid Email!",
                  },
                })}
              />
              {errors.u_email && (
                <div className="text-red-500 mx-2 my-1">
                  {errors.u_email.message}
                </div>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                name="u_password"
                placeholder="Enter your password"
                // disabled={isPending}
                className={`input input-bordered w-full ${
                  errors.u_password ? "input-error" : ""
                }`}
                {...register("u_password", {
                  required: "Password is Required! ",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!",
                  },
                })}
              />
              {errors.u_password && (
                <div className="text-red-500 mx-2 my-1">
                  {errors.u_password.message}
                </div>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Confirm Password</span>
              </div>
              <input
                type="password"
                name="cn_password"
                // disabled={isPending}
                placeholder="Confirm your password"
                className={`input input-bordered w-full ${
                  errors.cn_password ? "input-error" : ""
                }`}
                {...register("cn_password", {
                  required: "Confirm Password Needed!",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              {errors.cn_password && (
                <div className="text-red-500 mx-2 my-1">
                  {errors.cn_password.message}
                </div>
              )}
            </label>
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              // disabled={isPending}
            >
              {/* {isPending ? (
                <span className="loading loading-dots" />
              ) : (
                "Create Account"
              )} */}
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
