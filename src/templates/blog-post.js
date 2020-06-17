import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "katex/dist/katex.min.css"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"

export default function BlogPost({data}) {
  const post = data.mdx;
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h2>{post.frontmatter.title}</h2>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
     </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`