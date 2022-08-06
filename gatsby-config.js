module.exports = {
  siteMetadata: {
    siteUrl: `https://RiskLab.ai`,
    title: "RiskLab AI",
  },
  pathPrefix: "/RiskLab_Gatsby",
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
