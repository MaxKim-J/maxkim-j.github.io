import React from 'react';

import { Link } from 'gatsby';
import { nameStyle } from './Pic.css';
import { MDXRenderer } from 'gatsby-plugin-mdx';

interface Props {
  body: string;
}

export function Pic({ body }: Props) {
  return (
    <>
      <h1 className={nameStyle}>pic</h1>
      <section className="mdx-post">
        <MDXRenderer>{body}</MDXRenderer>
      </section>
    </>
  );
}
