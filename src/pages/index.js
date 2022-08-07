import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";

import Layout from "../components/layout";

function CardPage({ node }) {
  return (
    <Card sx={{ Width: 503 }} key={node.id}>
      <CardActionArea>
        <Link to={`/${node.slug}`}>
          <GatsbyImage
            image={getImage(node.frontmatter.page_image)}
            alt={node.frontmatter.page_image_alt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {node.frontmatter.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {node.frontmatter.page_image_desc}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <title>{process.env.REACT_APP_COMPANY_NAME}</title>

      {data.allMdx.nodes.map((node) => (
        <CardPage node={node} />
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          page_image_alt
          page_image_desc
          page_image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
