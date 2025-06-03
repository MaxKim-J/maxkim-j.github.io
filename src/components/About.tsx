import React from 'react';

import { nameStyle, SectionStyle } from './About.css';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTranslation } from 'react-i18next';

interface Props {
  body: string;
}

export function About({ body }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <h1 className={nameStyle}>{t('김종혁')}</h1>
      <section className={`mdx-post ${SectionStyle}`}>
        <MDXRenderer>{body}</MDXRenderer>
      </section>
    </>
  );
}
