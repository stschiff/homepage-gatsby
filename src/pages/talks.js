import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"

export default ({data}) => {
  return (
    <Layout pageTitle="Talks" activeNav="/talks">
      <SEO title="Stephan Schiffels - Talks" description="Public talks by Stephan Schiffels" />
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
query {
  file(relativePath: {eq: "talks.md"}) {
    childMdx {
      body
    }
  }
}`