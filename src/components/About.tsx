import React from 'react';

import { Link } from 'gatsby';
import {
  nameStyle,
  infoSectionStyle,
  infoStyle,
  infoAnchorStyle,
  infoTitleStyle,
  infoAnchorCompanyNameStyle,
  infoDetailSectionStyle,
} from './About.css';
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
      <section className="mdx-post">
        <MDXRenderer>{body}</MDXRenderer>
      </section>
      <div>
        <div className={infoDetailSectionStyle}>
          <span>Currently Working at </span>
          <Link className={infoAnchorCompanyNameStyle} to="https://flex.team">
            flex.team
          </Link>
          <span> as a Software Engineer</span>
          <span> in Seoul, South Korea(UTC+09:00)</span>
        </div>
        <div className={infoDetailSectionStyle}>
          <Link className={infoAnchorStyle} to="https://twitter.com/max_kim_dev">
            X
          </Link>
          <Link className={infoAnchorStyle} to="https://github.com/MaxKim-J">
            github
          </Link>
          <Link
            className={infoAnchorStyle}
            to="https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EA%B9%80-903967177/"
          >
            linkedin
          </Link>
          <Link className={infoAnchorStyle} to="https://github.com/MaxKim-J/RESUME">
            resume
          </Link>
          <span>
            contact:{' '}
            <Link className={infoAnchorStyle} to="mailto:hwaseen@gmail.com">
              hwaseen@gmail.com
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
