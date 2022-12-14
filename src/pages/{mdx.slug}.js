import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";

const BlogPost = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;

  return (
    <Layout title={frontmatter.title}>
      <div>
        <center>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.date}</p>
        </center>
        <MDXRenderer localImages={frontmatter.embeddedImagesLocal}>
          {body}
        </MDXRenderer>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export default BlogPost;
