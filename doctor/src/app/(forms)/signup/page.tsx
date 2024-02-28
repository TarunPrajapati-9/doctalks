"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Specialization } from "@prisma/client";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { trpc } from "@/utils/trpc";
import { DOCTOR_SPECIALIZATION } from "@/utils/constants";
import convertB64 from "@/utils/func/convertB64";
import { postCertificate } from "@/utils/func/dataPoster";

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
  const mutateFl = useMutation({
    mutationFn: postCertificate,
  });
  function onSubmit(formData: FormSchema) {
    mutateFl.mutate(formData.certificate, {
      async onSuccess(data) {
        if (data.success) {
          toast.success("Certificate is valid! Creating an account");
          mutate(
            {
              ...formData,
              certification: await convertB64(formData.certificate),
            },
            {
              onSuccess: (data) => {
                if (data.success) {
                  toast.success(`${data.message} with valid`);
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
        } else {
          toast.error("Certificate is invalid! Try uploading again");
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
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
              disabled={isPending || mutateFl.isPending}
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
              disabled={isPending || mutateFl.isPending}
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
              disabled={isPending || mutateFl.isPending}
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
              onChange={(e) => {
                setValue("certificate", e?.target?.files?.item(0) as File);
              }}
              className={twMerge(
                "file-input w-full",
                errors.certificate && "file-input-error"
              )}
              disabled={isPending || mutateFl.isPending}
              accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif"
              placeholder="Upload your certificate"
            />
          </label>
          <button
            disabled={isPending || mutateFl.isPending}
            type="submit"
            className="btn btn-primary w-full"
          >
            {(isPending || mutateFl.isPending) && (
              <span className="loading loading-spinner" />
            )}
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
