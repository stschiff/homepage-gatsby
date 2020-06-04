import React, {useState} from "react"
import Layout from "../components/layout"
import {Row, Col, Button, Collapse} from "react-bootstrap"
import Img from "gatsby-image"
import { graphql } from 'gatsby'
import dateFormat from "dateformat"

const Author = ({name}) => {
  if(name === "Stephan Schiffels")
    return (<u>{name}</u>)
  else 
    return (<span>{name}</span>)
}

const AbstractCollapse = ({abstract}) => {
  const [open, setOpen] = useState(false);
  if(abstract) {
    return (
      // <Row><Col>
      <div>
        <Button onClick={() => setOpen(!open)}
                aria-controls="collapse-abstract-text"
                aria-expanded={open}>
          Show Abstract
        </Button>
        <Collapse in={open}>
          <p id="collapse-abstract-text" className="border p-2">
            <i><small>{abstract}</small></i>
          </p>
        </Collapse>
      </div>
        // </Col></Row>
      );
  }
  else {
    return (<div></div>);
  }
}

const BibTexEntry = ({url, date, authors, title, journal, abstract, image}) => {
  const dateObj = new Date(date);
  let authors_annotated = []
  authors.slice(0, -1).forEach(function(a) {
    authors_annotated.push(<Author name={a} />);
    authors_annotated.push(<span>, </span>)
  })
  authors_annotated.push(<span> and </span>)
  authors_annotated.push(<Author name={authors.slice(-1)[0]} />)

  const imgComp = image ? <Img fluid={image.childImageSharp.fluid} alt=""/> : <div></div>;
  return (
    <div className="border-top py-3 mx-0">
      <Row>
        <Col xs={3} className="pl-0">
          {imgComp}
        </Col>
        <Col xs={9} className="pr-0">
          <p>
            <b>{title}. </b>
            <i>{journal}. </i>
            Published {dateFormat(dateObj, "mmmm dS, yyyy")}
          </p>
          <p>Authors: {authors_annotated}</p>
          <p>[<a href={url}>Website</a>] [PDF]</p>
          <AbstractCollapse abstract={abstract} />
        </Col>
      </Row>
    </div>
  )
}

export default ({data}) => {
  return (
    <Layout pageTitle="Publications" activeNav="/publications">
      {data.allPublicationsJson.nodes.map(node => {
        console.log(node);
        return (
          <BibTexEntry url={node.url}
                       journal={node.journal}
                       authors={node.authors}
                       title={node.title}
                       date={node.date}
                       abstract={node.abstract}
                       image={node.image}/>
        );
      })}
    </Layout>
  )
}

export const query = graphql`
query {
  allPublicationsJson(sort: {fields: date, order: DESC}) {
    nodes {
      url
      journal
      authors
      title
      date
      abstract
      image {
        childImageSharp {
          fluid(maxHeight: 400, maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}`