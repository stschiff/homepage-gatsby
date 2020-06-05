import { useStaticQuery, graphql } from "gatsby"
import {Figure, Container} from "react-bootstrap"
import React from "react"
import Img from "gatsby-image"

export default ({relPath, children}) => {
  const data = useStaticQuery(
    graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "images/blog"}}) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }`
  );
  let ret = <i>Image Not Found (path={relPath})</i>;
  data.allFile.nodes.forEach(node => {
    if(node.relativePath === relPath)
      ret = <Container><Figure>
        <Img fluid={node.childImageSharp.fluid} alt="hello"/>
        <Figure.Caption>{children}</Figure.Caption>
      </Figure></Container>
  });
  return ret;
}