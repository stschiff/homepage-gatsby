import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const Blogfigure = ({relPath, width=12, children, altText=""}) => {
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
  data.allFile.nodes.forEach(node => {
    if(node.relativePath === relPath)
      ret = <figure>
        <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={altText}/>
        <Figure.Caption>{children}</Figure.Caption>
      </figure>
  });
  return ret;
}

export default Blogfigure;