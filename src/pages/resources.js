import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({data}) => {
  return (
    <Layout pageTitle="Resources" activeNav="/resources">
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
query {
  file(relativePath: {eq: "resources.md"}) {
    childMdx {
      body
    }
  }
}`