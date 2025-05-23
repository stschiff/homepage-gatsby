import React from "react"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import {Row, Col} from "react-bootstrap"
import { graphql, Link } from 'gatsby'
import dateFormat from "dateformat"
import Seo from "../components/seo"

const BlogEntry = ({frontmatter, excerpt, date, link}) => {
  const imgComp = frontmatter.image ? <GatsbyImage image={frontmatter.image.childImageSharp.gatsbyImageData} alt="Highlighted image from the blog post"/> : <div></div>;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={3} className="pl-0">
        <Link to={link}>{imgComp}</Link>
      </Col>
      <Col xs={9} className="pr-0">
        <Link to={link}><h4>{frontmatter.title}</h4></Link>
        <p>{excerpt} <Link to={link}><i>Read more</i></Link></p>
        <i>Published {dateFormat(date, "mmmm dS, yyyy")}</i>
      </Col>
    </Row>
  );
}

const extract_date = str => new Date(str.substring(0, 10));

const BlogPage = ({data}) => {
  const all_posts = data.allFile.nodes.filter(node => node.childMdx.frontmatter.isBlogPost);
  all_posts.sort((n1, n2) => extract_date(n1.name) < extract_date(n2.name) ? 1 : -1);
  return (
    <Layout pageTitle="Blog" activeNav="/blog">
      <Seo title="Stephan Schiffels - Blog Posts" description="All Blog Posts listed chronologically" />
      <p>Note: Many of my blog posts also appear on <a href="https://medium.com/stephan-schiffels">Medium</a></p>
      {all_posts.map(node => {
        return (<BlogEntry link={node.childMdx.fields.slug}
                           frontmatter={node.childMdx.frontmatter}
                           excerpt={node.childMdx.excerpt}
                           date={extract_date(node.name)}/>);
      })}
    </Layout>
  );
}

export default BlogPage;

export const query = graphql`
query MyQuery {
  allFile(filter: {relativeDirectory: {eq: "posts"}}) {
    nodes {
      name
      childMdx {
        fields {
          slug
        }
        excerpt
        frontmatter {
          title
          isBlogPost
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.0)
            }
          }
        }
      }
    }
  }
}`
  