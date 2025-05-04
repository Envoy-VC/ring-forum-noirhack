export type Category = 'newest' | 'popular';

export type Community = {
  _id: string;
  _creationTime: number;
  description?: string | undefined;
  name: string;
};

export type Post = {
  _id: string;
  _creationTime: number;
  tags: string[];
  communityId: string;
  content: string;
  signature: {
    c0: string;
    s: string[];
    publicKeys: string[];
  };
};

export type PostWithCommunity = Omit<Post, 'communityId'> & {
  community: Community;
};
