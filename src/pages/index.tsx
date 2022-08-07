import * as React from 'react';
import { graphql, Link } from 'gatsby';

import MainLayout from '../components/@layout/MainLayout';

interface Props {
  data: {
    allMdx: {
      nodes: {
        id: string;
        slug: string;
        excerpt: string;
        frontmatter: {
          title: string;
          data: string;
        };
      }[];
    };
  };
}

const IndexPage = ({ data }: Props) => {
  return (
    <MainLayout
      header={<h1>김맥스 기술블로그</h1>}
      main={
        <div>
          {data &&
            data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
              <div key={id}>
                <Link to={`/posts/${slug}`}>
                  <p>{frontmatter.title}</p>
                  <p>
                    {frontmatter.date}, {frontmatter.description}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      }
      footer={<div>갯츠비</div>}
    />
  );
};

export default IndexPage;

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          description
          tags
        }
        slug
      }
    }
  }
`;
