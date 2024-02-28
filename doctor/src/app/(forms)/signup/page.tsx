"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Specialization } from "@prisma/client";
import { toast } from "react-toastify";

import { trpc } from "@/utils/trpc";
import { DOCTOR_SPECIALIZATION } from "@/utils/constants";
import convertB64 from "@/utils/func/convertB64";

type FormSchema = {
  username: string;
  email: string;
  password: string;
  specialization: Specialization;
  certificate: File;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormSchema>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      certificate: undefined,
      specialization: "CARDIOLOGY",
    },
  });
  const { mutate, isPending } = trpc.signUp.useMutation();
  async function onSubmit(data: FormSchema) {
    mutate(
      {
        ...data,
        certification: await convertB64(data.certificate),
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            router.push("/");
          } else {
            toast.error(data.message);
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
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
          // support file multipart
          encType="multipart/form-data"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="pointer-events-none"
            height={100}
            width={300}
          />
          {/* username */}
          <label className="form-control w-full">
            <div className="label">
              <span
                className={twMerge(
                  "label-text",
                  errors.username && "text-error"
                )}
              >
                {errors.username
                  ? "Enter valid username (min 6 chars, no spaces)"
                  : "Create your username"}
              </span>
            </div>
            <input
              type="text"
              placeholder="john_doe"
              className={twMerge(
                "input input-bordered w-full",
                errors.username && "input-error"
              )}
              disabled={isPending}
              {...register("username", {
                required: true,
                pattern: /^[a-zA-Z0-9_]+$/,
                minLength: 6,
              })}
            />
          </label>
          {/* email */}
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
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </label>
          {/* password */}
          <label className="form-control w-full">
            <div className="label">
              <span
                className={twMerge(
                  "label-text",
                  errors.password && "text-error"
                )}
              >
                {errors.password
                  ? "Password is required"
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
          {/* specialization */}
          <label className="form-control w-full">
            <div className="label">
              <span
                className={twMerge(
                  "label-text",
                  errors.specialization && "text-error"
                )}
              >
                {errors.specialization
                  ? "Select an appropriate specialization"
                  : "Select your specialization"}
              </span>
            </div>
            <select
              className={twMerge(
                "select w-full",
                errors.specialization && "select-error"
              )}
              {...register("specialization", { required: true })}
            >
              {DOCTOR_SPECIALIZATION.map((specialization) => (
                <option
                  key={`${specialization} + SELECT_SPECIALIZATION_LOGIN_OPTION`}
                  value={specialization}
                >
                  {specialization}
                </option>
              ))}
            </select>
          </label>
          {/* certificate */}
          <label className="form-control w-full">
            <div className="label">
              <span
                className={twMerge(
                  "label-text",
                  errors.certificate && "text-error"
                )}
              >
                {errors.certificate
                  ? "Certificate is required "
                  : "Upload your certificate"}
              </span>
            </div>
            <input
              type="file"
              onChange={async (e) => {
                setValue("certificate", e?.target?.files?.item(0) as File);
              }}
              className={twMerge(
                "file-input w-full",
                errors.certificate && "file-input-error"
              )}
              accept="image/*"
              placeholder="Upload your certificate"
            />
          </label>
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary w-full"
          >
            {isPending && <span className="loading loading-spinner" />}
            Create new account!
          </button>
          {/* sign up link */}
          <div>
            Already have an account?{" "}
            <Link className="btn-link" href="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
