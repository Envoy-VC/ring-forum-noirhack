import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema(
  {
    users: defineTable({
      publicKey: v.string(),
    }).index('by_public_key', ['publicKey']),
    communities: defineTable({
      name: v.string(),
      description: v.optional(v.string()),
    })
      .index('by_name', ['name'])
      .searchIndex('search_by_name', {
        searchField: 'name',
      }),
    communityMembers: defineTable({
      userId: v.id('users'),
      communityId: v.id('communities'),
    })
      .index('by_user_and_community', ['userId', 'communityId'])
      .index('by_community', ['communityId'])
      .index('by_user', ['userId']),
    posts: defineTable({
      content: v.string(),
      tags: v.array(v.string()),
      communityId: v.id('communities'),
      signature: v.object({
        c0: v.string(),
        s: v.array(v.string()),
        publicKeys: v.array(v.string()),
      }),
    }).index('by_community', ['communityId']),
    taggedPosts: defineTable({
      tag: v.string(),
      postId: v.id('posts'),
    }).index('by_tag_and_time', ['tag']),
  },
  {
    strictTableNameTypes: true,
    schemaValidation: true,
  }
);

// biome-ignore lint/style/noDefaultExport: Needed for convex
export default schema;
