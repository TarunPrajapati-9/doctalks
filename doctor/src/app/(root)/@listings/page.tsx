import { getUserListings } from "@/actions/actions";

import ListingCard from "@/components/ListingCard";
import EmptyState from "@/components/shared/EmptyState";

const Sessions = async () => {
  const listings = await getUserListings();
  return (
    <div>
      <h3 className="text-2xl mb-6 font-semibold">My Listings</h3>
      {listings.length == 0 ? (
        <EmptyState message="No listing available!" />
      ) : (
        <div>
          <div className="flex justify-stretch gap-6 flex-wrap w-full">
            {listings.map((listing) => (
              <div key={listing.id}>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
