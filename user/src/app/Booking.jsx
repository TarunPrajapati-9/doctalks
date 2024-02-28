import { useForm } from "react-hook-form";
const Booking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col m-6 space-y-2"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("time", { required: true })}
            />
            {errors.time && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("duration", { required: true })}
            />
            {errors.duration && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Booking;
