import { v } from 'convex/values';

import { query } from '../_generated/server';

export const countPostsWithTagInTimeframe = query({
  args: {
    tag: v.string(),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (ctx, args) => {
    const taggedPosts = await ctx.db
      .query('taggedPosts')
      .withIndex('by_tag_and_time', (q) =>
        q
          .eq('tag', args.tag)
          .gte('_creationTime', args.startTime)
          .lt('_creationTime', args.endTime)
      )
      .collect();

    return taggedPosts.length;
  },
});

export const getTrendingTags = query({
  args: {
    startTime: v.number(),
    endTime: v.number(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10; // Default to top 10 tags

    // Get all tagged posts in the timeframe
    const taggedPosts = await ctx.db
      .query('taggedPosts')
      .withIndex('by_creation_time', (q) =>
        q.gte('_creationTime', args.startTime).lt('_creationTime', args.endTime)
      )
      .collect();

    // Count occurrences of each tag
    const tagCounts = new Map<string, number>();
    for (const post of taggedPosts) {
      const count = tagCounts.get(post.tag) || 0;
      tagCounts.set(post.tag, count + 1);
    }

    // Convert to array and sort by count (descending)
    const trendingTags = Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return trendingTags;
  },
});
