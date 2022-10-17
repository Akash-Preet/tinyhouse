import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },

  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
    numOfBookings: (listing: Listing): number => listing.bookings.length
  }
};
