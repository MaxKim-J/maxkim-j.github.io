import React from 'react';

import { Link } from 'gatsby';
import {
  nameStyle,
  infoSectionStyle,
  infoStyle,
  infoAnchorStyle,
  infoTitleStyle,
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

      <div className={infoSectionStyle}>
        <div className={infoStyle}>
          <div className={infoTitleStyle}>Location</div>
          <div>Seoul, South Korea(UTC+09:00)</div>
        </div>
        <div className={infoStyle}>
          <div className={infoTitleStyle}>Working at</div>
          <Link className={infoAnchorStyle} to="https://flex.team">
            <span className={infoTitleStyle}>flex.team</span> Product Engineer(FE)
          </Link>
        </div>
        <div className={infoStyle}>
          <div className={infoTitleStyle}>Find Me On</div>
          <div>
            <Link className={infoAnchorStyle} to="https://twitter.com/max_kim_dev">
              twitter
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
          </div>
        </div>
        <div className={infoStyle}>
          <div className={infoTitleStyle}>Contact</div>
          <Link className={infoAnchorStyle} to="mailto:hwaseen@gmail.com">
            hwaseen@gmail.com
          </Link>
        </div>
      </div>
    </>
  );
}
