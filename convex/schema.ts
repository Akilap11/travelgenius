import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    name: v.string(),
    imageurl: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),

  }),
  TripDetailTable: defineTable({
    tripId: v.string(),
    tripDetail: v.any(),
    useId: v.id('UserTable'),
  }),
});