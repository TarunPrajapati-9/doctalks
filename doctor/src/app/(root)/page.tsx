import { getUserListings } from "@/actions/actions";
import ListingCard from "@/components/ListingCard";
import EmptyState from "@/components/shared/EmptyState";

export default async function Home() {
  return null;
  // (
  // <div className="container mx-auto py-20">
  //   <div>
  //     {upcomingListings.length == 0 ? (
  //       <EmptyState message="No upcoming listings available!" />
  //     ) : (
  //       <div>
  //         <h3 className="text-2xl mb-6 font-semibold">Upcoming Listings</h3>
  //         <div className="flex justify-stretch gap-6 flex-wrap w-full">
  //           {upcomingListings.map((listing) => (
  //             <div key={listing.id}>
  //               <ListingCard listing={listing} />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // </div>
  // );
}
