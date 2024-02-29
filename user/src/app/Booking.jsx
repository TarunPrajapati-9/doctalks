import { useForm } from "react-hook-form";

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  let month = tomorrow.getMonth() + 1;
  let day = tomorrow.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}
// function getTodayDate() {
//   const today = new Date();
//   const year = today.getFullYear();
//   let month = today.getMonth() + 1;
//   let day = today.getDate();

//   // Add leading zero for single-digit months and days
//   month = month < 10 ? `0${month}` : month;
//   day = day < 10 ? `0${day}` : day;

//   return `${year}-${month}-${day}` ;
// }

// function getCurrentTime() {
//   const today = new Date();
//   let hours = today.getHours();
//   let minutes = today.getMinutes();

//   hours = hours < 10 ? `0${hours}` : hours;
//   minutes = minutes < 10 ? `0${minutes}` : minutes;

//   return `${hours}:${minutes}`;
// }

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-sm mx-auto mt-4 justify-center"
        action=""
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("date", {
              required: true,
            })}
            min={getTomorrowDate()}
            // min={getTodayDate()}
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
            // min={getCurrentTime()}
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
    </>
  );
};

export default Booking;
