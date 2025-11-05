import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { q } from "motion/react-client";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    imageurl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("UserTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    if (user?.length === 0) {
      const userData={
        name: args.name,
        imageurl: args.imageurl,
        email: args.email,
      }
      const result = await ctx.db.insert("UserTable", userData);
      return userData;
    }
    return user[0];
  },
});
