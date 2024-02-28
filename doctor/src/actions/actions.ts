"use server";

import db from "@/utils/db";
import getUserDataByToken from "@/utils/func/getUserDataByToken";
import { Doctor, Listing, Session } from "@prisma/client";

export async function getUserListings(): Promise<Listing[]> {
  try {
    const doc = getUserDataByToken();
    const listings = await db.listing.findMany({
      where: {
        doctor_id: doc?.id,
      },
    });
    return listings;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export async function getCurrentUser(): Promise<Doctor | null> {
  try {
    const doc = getUserDataByToken();
    const user = await db.doctor.findUnique({
      where: {
        id: doc?.id,
      },
    });
    return user;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

export async function getCurrentSessions(): Promise<Session[]> {
  try {
    const doc = getUserDataByToken();
    const sessions = await db.session.findMany({
      where: {
        doctor_id: doc?.id,
      },
    });
    return sessions;
  } catch (error: any) {
    console.error(error);
    return [];
  }
}
