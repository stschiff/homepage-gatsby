import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "../components/seo"

const TalkPage = ({data}) => {
  return (
    <Layout pageTitle="Talks" activeNav="/talks">
      <Seo title="Stephan Schiffels - Talks" description="Public talks by Stephan Schiffels" />
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </Layout>
  )
}

export default TalkPage;

export const query = graphql`
query {
  file(relativePath: {eq: "talks.md"}) {
    childMdx {
      body
    }
  }
}`