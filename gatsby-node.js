const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({node, name: `slug`, value: slug});
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allFile(filter: {relativeDirectory: {eq: "posts"}}) {
        nodes {
          childMdx {
            fields {
              slug
            }
          }
        }
      }
    }    
  `);
 
  result.data.allFile.nodes.forEach(node => {
    createPage({
      path: node.childMdx.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.childMdx.fields.slug,
      },
    })
  });
}