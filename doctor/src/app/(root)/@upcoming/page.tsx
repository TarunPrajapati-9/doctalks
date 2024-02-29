import { getUserListings } from "@/actions/actions";

import ListingCard from "@/components/ListingCard";
import EmptyState from "@/components/shared/EmptyState";

const Sessions = async () => {
  const listings = await getUserListings();
  const upcomingListings = listings.filter((item) => item.time > new Date());
  return (
    <div className="container mx-auto pt-8">
      <h3 className="text-2xl mb-6 font-semibold">Upcoming Listings</h3>
      <div>
        {upcomingListings.length == 0 ? (
          <EmptyState message="No upcoming listings available!" />
        ) : (
          <div>
            <div className="flex justify-stretch gap-6 flex-wrap w-full">
              {upcomingListings.map((listing) => (
                <div key={listing.id}>
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
