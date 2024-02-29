"use client";

import { useEffect, useMemo, useState } from "react";
import { Listing } from "@prisma/client";
import Markdown from "react-markdown";
import { twMerge } from "tailwind-merge";

type Props = {
  listing: Listing;
};

const ListingCard = ({ listing }: Props) => {
  const isListingDisabled = useMemo(() => {
    const currentTime = new Date();
    return !(currentTime >= listing.time && currentTime <= listing.endtime);
  }, [listing.endtime, listing.time]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const disabled = useMemo(() => listing.time < new Date(), [listing.time]);
  if (!mounted) return null;
  return (
    <div>
      <div
        className={twMerge(
          "card w-96 overflow-clip bg-[#a8fea8] text-white shadow-xl",
          disabled && "opacity-50 cursor-not-allowed select-none"
        )}
      >
        <div className="card-body">
          <h2 className="card-title text-gray-600">{listing.title}</h2>
          <p className="line-clamp-1 prose">
            <Markdown>{listing.description}</Markdown>
          </p>
          <div className="card-actions justify-end mt-4">
            {disabled ? (
              <p className="text-red-500">Session has ended</p>
            ) : (
              <>
                <button
                  disabled={isListingDisabled}
                  className="btn btn-info text-white"
                >
                  Start session
                </button>
                <button className="btn">Edit</button>
                <button className="btn btn-error text-white">Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
