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

export const getCommunity = query({
  args: {
    communityName: v.string(),
  },
  handler: async (ctx, args) => {
    const formatted = args.communityName.trim();
    const community = await ctx.db
      .query('communities')
      .withIndex('by_name', (q) => q.eq('name', formatted))
      .first();

    if (!community) {
      throw new Error('Community not found');
    }

    return community;
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

export const getMembersInCommunity = query({
  args: {
    communityId: v.id('communities'),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query('communityMembers')
      .withIndex('by_community', (q) => q.eq('communityId', args.communityId))
      .collect();

    const members = await Promise.all(
      res.map(async (member) => {
        const user = await ctx.db.get(member.userId);
        return user;
      })
    );
    return members.filter((x) => x !== null);
  },
});

export const joinCommunity = mutation({
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

    if (isMember) {
      throw new Error('User is already a member of the community');
    }

    await ctx.db.insert('communityMembers', {
      userId: user._id,
      communityId: community._id,
    });
  },
});

export const leaveCommunity = mutation({
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

    if (!isMember) {
      throw new Error('User is not a member of the community');
    }

    await ctx.db.delete(isMember._id);
  },
});
