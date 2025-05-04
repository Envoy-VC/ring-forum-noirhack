import { v } from 'convex/values';

import { mutation, query } from '../_generated/server';

export const createCommunity = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const parsedName = args.name.toLowerCase().trim();
    const exists = await ctx.db
      .query('communities')
      .withIndex('by_name', (q) => q.eq('name', parsedName))
      .first();

    if (exists) {
      throw new Error('Community with that name already exists');
    }

    const id = await ctx.db.insert('communities', {
      name: parsedName,
      description: args.description,
    });
    return id;
  },
});

export const getPostsForCommunity = query({
  args: {
    communityId: v.id('communities'),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('posts')
      .withIndex('by_community', (q) => q.eq('communityId', args.communityId))
      .collect();
    return posts;
  },
});

export const getTotalMembersInCommunity = query({
  args: {
    communityId: v.id('communities'),
  },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query('communityMembers')
      .withIndex('by_community', (q) => q.eq('communityId', args.communityId))
      .collect();
    return members.length;
  },
});
