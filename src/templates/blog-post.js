import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "../components/seo"
import { Disqus } from 'gatsby-plugin-disqus';

export default function BlogPost({data}) {
  const post = data.mdx;
  return (
    <Layout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h2>{post.frontmatter.title}</h2>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
      <Disqus
        config={{
          /* Replace PAGE_URL with your post's canonical URL variable */
          url: post.slug,
          /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
          identifier: post.id,
          /* Replace PAGE_TITLE with the title of the page */
          title: post.frontmatter.title
        }}
      />
     </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      id
      frontmatter {
        title
        isBlogPost
      }
    }
  }
`