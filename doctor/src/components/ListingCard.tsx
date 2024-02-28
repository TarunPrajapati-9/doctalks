"use client";

import { Listing } from "@prisma/client";
import { useMemo } from "react";
import Markdown from "react-markdown";

type Props = {
  listing: Listing;
};

const ListingCard = ({ listing }: Props) => {
  const isListingDisabled = useMemo(() => {
    const startTime = new Date(listing.time);
    const endTime = new Date(listing.endtime);
    const currentTime = new Date();
    return (
      startTime.getTime() - currentTime.getTime() <= 900000 &&
      endTime.getTime() - currentTime.getTime() >= -300000
    );
  }, [listing.endtime, listing.time]);
  return (
    <div>
      <div className="card w-96 bg-[#a8fea8] text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-gray-600">{listing.title}</h2>
          <p className="line-clamp-2 prose">
            <Markdown>{listing.description}</Markdown>
          </p>
          <div className="card-actions justify-end mt-4">
            <button
              disabled={isListingDisabled}
              className="btn btn-info text-white"
            >
              Start session
            </button>
            <button className="btn">Edit</button>
            <button className="btn btn-error text-white">Delete</button>
            {/* button enables only when there is 15 minutes less time */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
