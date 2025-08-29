import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { resources } from '../i18n/resources';
import { Lang } from '../types';

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

interface Props {
  title?: string;
  description?: string;
  thumbnail?: string;
  lang: Lang;
  slug: string;
  type: 'article' | 'website';
}

const MetaHead = ({ title, description, thumbnail, lang, slug }: Props) => {
  const { image, siteUrl, twitterUsername } = useSiteMetadata();

  const defaultTitle = resources[lang].translation['김맥스 블로그'];
  const defaultDescription = resources[lang].translation['김맥스의 블로그입니다'];

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${thumbnail ?? image}`,
    twitterUsername,
    type: 'website',
    url: `${siteUrl}/${lang === 'en' ? 'en/' : ''}posts/${slug}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta httpEquiv="Content-Language" content={lang} />
      <meta property="og:site_name" content="Max Kim Blog" />
      <meta name="og:description" content={seo.description} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:image" content={seo.image} />
      <meta name="og:type" content={seo.type} />
      <meta name="og:url" content={seo.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
    </>
  );
};

export default MetaHead;
