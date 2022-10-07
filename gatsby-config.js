module.exports = {
  siteMetadata: {
    siteUrl: `https://GatsbyBlog.com`,
    title: "Gatsby Blog",
  },
  pathPrefix: "/Gatsby_Blog",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    "gatsby-transformer-csv",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
  ],
};
