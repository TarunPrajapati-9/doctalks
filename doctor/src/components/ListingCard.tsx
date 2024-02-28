"use client";

import { useEffect, useMemo, useState } from "react";
import { Listing } from "@prisma/client";
import Markdown from "react-markdown";

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

  if (!mounted) return null;
  return (
    <div>
      <div className="card w-96 overflow-clip bg-[#a8fea8] text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-gray-600">{listing.title}</h2>
          <p className="line-clamp-1 prose">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
