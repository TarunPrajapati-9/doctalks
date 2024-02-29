"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import { trpc } from "@/utils/trpc";

type FormSchema = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = trpc.login.useMutation();
  function onSubmit(data: FormSchema) {
    mutate(data, {
      onSuccess(data) {
        if (data.success) {
          toast.success(data.message);
          router.push("/");
        } else {
          toast.error(data.message);
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
    reset();
  }
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-[#ebfbec]">
      {/* left section */}
      <div className="flex h-full w-full md:w-full items-center justify-center">
        <form
          className="w-[95%] md:w-[70%] flex flex-col items-center justify-center gap-y-6 rounded-sm shadow-lg p-10 bg-[#f7fbf7]"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="pointer-events-none"
            height={100}
            width={300}
          />
          <label className="form-control w-full">
            <div className="label">
              <span
                className={twMerge("label-text", errors.email && "text-error")}
              >
                {errors.email ? "Enter valid email" : "Enter your email"}
              </span>
            </div>
            <input
              type="text"
              placeholder="example@outlook.com"
              className={twMerge(
                "input input-bordered w-full",
                errors.email && "input-error"
              )}
              disabled={isPending}
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span
                className={twMerge(
                  "label-text",
                  errors.password && "text-error"
                )}
              >
                {errors.password
                  ? "Password is required (min 6 length)"
                  : "Enter your password"}
              </span>
            </div>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="********************"
              className={twMerge(
                "input input-bordered w-full",
                errors.password && "input-error"
              )}
              disabled={isPending}
            />
          </label>
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary w-full"
          >
            {isPending && <span className="loading loading-spinner" />}
            Login
          </button>
          {/* sign up link */}
          <div>
            Don&apos;t have an account?{" "}
            <Link className="btn-link" href="/signup">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
