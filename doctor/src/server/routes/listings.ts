import { z } from "zod";

import { LISTING_CREATE } from "@/utils/types/zod";
import db from "@/utils/db";
import getUserDataByToken from "@/utils/func/getUserDataByToken";

import { doctorProcedure, router } from "../trpc";

const listingRouter = router({
  createListing: doctorProcedure
    .input(LISTING_CREATE)
    .output(z.object({ status: z.boolean(), message: z.string() }))
    .mutation(async ({ input }) => {
      const data = getUserDataByToken();
      try {
        const { average_duration, description, price, title, time } = input;
        const endTime = new Date(time);
        endTime.setMinutes(endTime.getMinutes() + Number(average_duration));
        const listing = await db.listing.findMany({
          where: {
            doctor: {
              id: data?.id,
            },
            time: {
              gte: new Date(time),
              lt: endTime,
            },
          },
        });
        if (listing.length > 0) {
          return {
            status: false,
            message: "Listing already exist in this duration",
          };
        }
        const id = await db.listing.create({
          data: {
            avg_duration: Number(average_duration),
            description,
            price: Number(price),
            title,
            time: new Date(time).toISOString(),
            endtime: endTime.toISOString(),
            doctor: {
              connect: {
                id: data?.id,
              },
            },
          },
          select: {
            id: true,
          },
        });

        if (id.id)
          return { status: true, message: "Listing created successfully" };
        return { status: false, message: "Something went wrong" };
      } catch (error: any) {
        console.error(error.message);
        return { status: false, message: error.message };
      }
    }),
});

export default listingRouter;
