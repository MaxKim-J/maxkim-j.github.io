export interface BlogPost {
  id: string;
  slug: string;
  excerpt: string;
  body?: string;
  frontmatter: {
    title: string;
    data: string;
    category: string;
    slug: string;
    date: string;
    description: string;
    tags?: string[];
    lang: string;
    thumbnail?: {
      childImageSharp: {
        fluid: {
          src: string;
        };
      };
    };
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

export type PostCategory = 'all' | 'tech' | 'essay' | 'culture';

export type Lang = 'ko' | 'en';
