module.exports = {
  siteMetadata: {
    title: `Stephan Schiffels`,
    description: `Professional Website of Stephan Schiffels and the Population Genetics group at the MPI-SHH`,
    author: `Stephan Schiffels`,
  },
  plugins: [
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          }
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pageData",
        path: "./src/data/",
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
          shortname: `stephans-homepage`
      }
    }
  ],
}
