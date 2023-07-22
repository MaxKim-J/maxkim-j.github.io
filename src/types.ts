export interface Post {
  id: string;
  slug: string;
  excerpt: string;
  body?: string;
  frontmatter: {
    title: string;
    data: string;
    category: string;
    date: string;
    description: string;
    tags?: string[];
  };
}

export interface PostSlugList {
  nodes: {
    slug: string;
  }[];
}

export interface PicPost {
  body: string;
  frontmatter: {
    title: string;
    description: string;
  };
}

export type Theme = 'light' | 'dark' | 'mincho' | 'lemon';

export type PostList = Post[];
