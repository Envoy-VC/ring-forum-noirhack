import { v } from 'convex/values';

import { mutation, query } from '../_generated/server';

export const createUser = mutation({
  args: {
    publicKey: v.string(),
  },
  handler: async (ctx, args) => {
    const exists = await ctx.db
      .query('users')
      .withIndex('by_public_key', (q) => q.eq('publicKey', args.publicKey))
      .first();

    if (exists) {
      throw new Error('User already exists');
    }

    const id = await ctx.db.insert('users', { publicKey: args.publicKey });
    return id;
  },
});

export const getUserCommunities = query({
  args: {
    publicKey: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_public_key', (q) => q.eq('publicKey', args.publicKey))
      .first();

    if (!user) {
      return [];
    }

    const communityIds = await ctx.db
      .query('communityMembers')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect();

    const communities = await Promise.all(
      communityIds.map((c) => ctx.db.get(c.communityId))
    );
    return communities.filter((x) => x !== null);
  },
});

export const isPartOfCommunity = query({
  args: {
    communityId: v.id('communities'),
    publicKey: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_public_key', (q) => q.eq('publicKey', args.publicKey))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    const community = await ctx.db.get(args.communityId);

    if (!community) {
      throw new Error('Community not found');
    }

    const isMember = await ctx.db
      .query('communityMembers')
      .withIndex('by_user_and_community', (q) =>
        q.eq('userId', user._id).eq('communityId', community._id)
      )
      .first();

    return Boolean(isMember);
  },
});
