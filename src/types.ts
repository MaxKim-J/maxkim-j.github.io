export interface BlogPost {
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

export type BlogPosts = BlogPost[];

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

export type Theme = 'light' | 'dark';
