import { ObjectId } from "mongodb";
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

  Mutation: {
    favoriteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ _id: new ObjectId(id) });

      if (!listing) {
        throw new Error("failed to favorite listing");
      }

      const updateRes = await db.listings.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { favorite: !listing.favorite } },
        { returnOriginal: false }
      );

      if (!updateRes.value) {
        throw new Error("failed to favorite listing");
      }

      return updateRes.value;
    }
  },

  Listing: {
    id: (listing: Listing): string => listing._id.toString()
  }
};
