import { getUserListings } from "@/actions/actions";
import ListingCard from "@/components/ListingCard";
import EmptyState from "@/components/shared/EmptyState";

export default async function Home() {
  const listings = await getUserListings();
  return (
    <div className="container mx-auto py-20">
      <div>
        {listings.length == 0 ? (
          <EmptyState message="No listing available!" />
        ) : (
          <div>
            <h3 className="text-2xl mb-6 font-semibold">My Listings</h3>
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
    </div>
  );
}
