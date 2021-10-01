import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "../components/Seo"

export default ({data}) => {
  return (
    <Layout pageTitle="Contact" activeNav="/contact">
      <Seo title="Stephan Schiffels - Contact" description="Contact Details" />
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