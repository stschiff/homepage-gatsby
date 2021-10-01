import { useStaticQuery, graphql } from "gatsby"
import {Figure, Row} from "react-bootstrap"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export default ({relPath, width=12, children, altText=""}) => {
  const data = useStaticQuery(
    graphql`
    query {
      allFile(filter: {relativeDirectory: {eq: "images/blog"}}) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }`
  );
  let ret = <i>Image Not Found (path={relPath})</i>;
  const cl = `col-md-${width}`;
  data.allFile.nodes.forEach(node => {
    if(node.relativePath === relPath)
      ret = <Row className="justify-content-md-center"><Figure className={cl}>
        <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={altText}/>
        <Figure.Caption>{children}</Figure.Caption>
      </Figure></Row>
  });
  return ret;
}