"use client";
import { useParams, useRouter } from "next/navigation";

const UtilityHeader = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="w-full rounded-full bg-green-50 p-3 px-8 my-8">
      <div className="py-3 flex items-center gap-x-4">
        <div className="w-1/2 flex items-center gap-x-4">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            onClick={() =>
              router.replace(
                `/?hidePast=${params.hidePast === "1" ? "0" : "1"}`
              )
            }
          />
          <label className="text-lg" htmlFor="checkbox">
            hide past listings
          </label>
        </div>
      </div>
    </div>
  );
};

export default UtilityHeader;
