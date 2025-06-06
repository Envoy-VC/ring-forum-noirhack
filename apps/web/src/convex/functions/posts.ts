import { v } from 'convex/values';

import { mutation, query } from '../_generated/server';

function extractEndHashtags(input: string): {
  content: string;
  tags: string[];
} {
  const lines = input.trim().split('\n');
  // biome-ignore lint/style/noNonNullAssertion: safe
  const lastLine = lines.at(-1)!.trim();

  const hashtagRegex = /#([\w-]+)/g;
  const matches = [...lastLine.matchAll(hashtagRegex)];
  const tags = matches.map((m) => m[1]);

  const cleanedLastLine = lastLine
    .replace(hashtagRegex, '')
    .replace(/\s+/g, ' ')
    .trim();

  const contentLines = lines.slice(0, -1);
  if (cleanedLastLine) {
    contentLines.push(cleanedLastLine);
  }

  const content = contentLines.join('\n').trim();

  return { content, tags };
}

export const createPost = mutation({
  args: {
    content: v.string(),
    publicKey: v.string(),
    communityId: v.id('communities'),
    signature: v.object({
      c0: v.string(),
      s: v.array(v.string()),
      publicKeys: v.array(v.string()),
    }),
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

    const { content, tags } = extractEndHashtags(args.content);

    const id = await ctx.db.insert('posts', {
      content,
      tags,
      communityId: community._id,
      signature: args.signature,
    });

    for (const tag of tags) {
      await ctx.db.insert('taggedPosts', {
        tag,
        postId: id,
      });
    }
    return id;
  },
});

export const getLatestPosts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('posts')
      .order('desc')
      .take(args.limit ?? 5);
    const postsWithCommunity = await Promise.all(
      posts.map(async (post) => {
        const community = await ctx.db.get(post.communityId);
        if (!community) throw new Error('Community not found');
        const { communityId, ...rest } = post;
        return {
          ...rest,
          community,
        };
      })
    );
    return postsWithCommunity;
  },
});
