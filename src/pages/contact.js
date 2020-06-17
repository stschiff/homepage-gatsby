import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"

export default ({data}) => {
  return (
    <Layout pageTitle="Contact" activeNav="/contact">
      <SEO title="Stephan Schiffels - Contact" description="Contact Details" />
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
query {
  file(relativePath: {eq: "contact.md"}) {
    childMdx {
      body
    }
  }
}`