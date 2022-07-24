import * as React from 'react';
import { graphql, Link } from 'gatsby';
import globalStyle from '../styles/global';

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
  // 쿼리파람 가져오기
  globalStyle();
  console.log(data);

  return (
    <main>
      <h1>김맥스 기술블로그</h1>
      {data &&
        data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
          <div key={id}>
            <Link to={`/posts/${slug}`}>
              <h2>{frontmatter.title}</h2>
              <p>
                {frontmatter.date}, {frontmatter.description}
              </p>
            </Link>
          </div>
        ))}
    </main>
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
