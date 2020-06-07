import { useStaticQuery, graphql } from "gatsby"
import {Figure, Row} from "react-bootstrap"
import React from "react"
import Img from "gatsby-image"

export default ({relPath, width=12, children}) => {
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
  const cl = `col-md-${width}`;
  console.log(cl);
  data.allFile.nodes.forEach(node => {
    if(node.relativePath === relPath)
      ret = <Row className="justify-content-md-center"><Figure className={cl}>
        <Img fluid={node.childImageSharp.fluid} alt="hello"/>
        <Figure.Caption>{children}</Figure.Caption>
      </Figure></Row>
  });
  return ret;
}