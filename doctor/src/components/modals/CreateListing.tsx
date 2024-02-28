"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";

import { trpc } from "@/utils/trpc";

import Modal from "../shared/Modal";
import TextField from "../shared/TextField";
import useModal from "@/hooks/useModal";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

type FormSchema = {
  title: string;
  price: string;
  avg_duration: string;
  description: string;
  time: string;
};
const CreateListing = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      title: "",
      price: undefined,
      avg_duration: undefined,
      description: "",
    },
  });
  const description = watch("description");
  const { closeModal } = useModal();
  const { mutate, isPending } = trpc.listings.createListing.useMutation();
  const onSubmit = (data: FormSchema) => {
    if (data.description.length === 0) {
      toast.error("Enter description");
      router.refresh();
      return;
    }
    if (new Date(data.time) < new Date()) {
      toast.error("Date must be of future");
      router.refresh();
      return;
    }
    console.log(data.time);
    mutate(
      {
        ...data,
        average_duration: data.avg_duration,
        time: data.time,
      },
      {
        onSuccess: (flg) => {
          if (flg.status) {
            toast.success(flg.message);
            closeModal();
            reset();
          } else toast.error(flg.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <Modal type="create-listing" className="overflow-y-auto">
      <h1 className="text-3xl text-center text-gray-700 font-semibold ">
        Create listing modal
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 flex flex-col gap-4"
      >
        <TextField<FormSchema>
          label="Title"
          name="title"
          placeholder="Mind relaxing session"
          register={register}
          required
          errorMessage="Title is required"
          isInvalid={errors.title ? true : false}
          disabled={isPending}
        />
        <TextField<FormSchema>
          label="Price"
          name="price"
          placeholder="1000"
          type="number"
          register={register}
          required
          errorMessage="Price is required"
          isInvalid={errors.price ? true : false}
          disabled={isPending}
        />
        <TextField<FormSchema>
          label="Average duration in (minutes)"
          name="avg_duration"
          placeholder="120"
          type="number"
          register={register}
          required
          errorMessage="Average duration is required"
          isInvalid={errors.avg_duration ? true : false}
          disabled={isPending}
        />
        <TextField<FormSchema>
          label="Time"
          name="time"
          placeholder="12:00"
          type="datetime-local"
          register={register}
          required
          errorMessage="Time is required"
          isInvalid={errors.time ? true : false}
        />
        <div data-color-mode="light">
          <div className="label">
            <span
              className={twMerge(
                "label-text",
                errors.description && "text-error"
              )}
            >
              {errors.description ? "Description is required" : "Description"}
            </span>
          </div>
          <MDEditor
            value={description}
            onChange={(v) => setValue("description", v ?? "")}
            aria-disabled={isPending}
            aria-placeholder="Enter description"
          />
        </div>
        <button
          type="submit"
          className="btn btn-success text-white"
          disabled={isPending}
        >
          {isPending && <span className="loading loading-spinner" />}
          Create
        </button>
      </form>
    </Modal>
  );
};

export default CreateListing;
