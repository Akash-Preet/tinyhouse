import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    }
  },

  Mutation: {
    favoriteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          listings[i].favorite = !listings[i].favorite;
          return listings[i];
        }
      }

      throw new Error("failed to favorite listing");
    }
  }
};
