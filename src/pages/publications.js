import React, {useState} from "react"
import Layout from "../components/layout"
import {Row, Col, Button, Collapse, Badge} from "react-bootstrap"
import Img from "gatsby-image"
import { graphql } from 'gatsby'
import dateFormat from "dateformat"
import SEO from "../components/seo"

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
                variant="secondary"
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

const PubEntry = ({url, date, authors, title, journal, abstract, image, citekey, role, pdfLink}) => {
  const dateObj = new Date(date);
  let authors_annotated = []
  authors.slice(0, -1).forEach(function(a) {
    authors_annotated.push(<Author name={a} />);
    authors_annotated.push(<span>, </span>)
  })
  authors_annotated.push(<span> and </span>)
  authors_annotated.push(<Author name={authors.slice(-1)[0]} />)

  let [collapsedState, setAuthorsCollapse] = useState(true);


  let authors_short = []
  if(authors.length <= 6) {
    authors_short = authors_annotated;
  }
  else {
    // authors_short = [authors_annotated[0], <span>...<Button variant="secondary" size="sm" onClick={() => setAuthorsCollapse(false)}>Expand</Button>...</span>, authors_annotated[authors_annotated.length - 1]];
    authors_short = [authors_annotated[0], <span>...<Button className="mx-1 p-0" variant="secondary" size="sm" onClick={() => setAuthorsCollapse(false)}>Expand</Button>...</span>, authors_annotated[authors_annotated.length - 1]];
  }
  if(authors.length > 6) {
    authors_annotated.push(<Button className="ml-1 p-0" variant="secondary" size="sm" onClick={() => setAuthorsCollapse(true)}>Collapse</Button>);
  }

  const imgComp = image ? <Img fluid={image.childImageSharp.fluid} alt="An image from the publication"/> : <div></div>;

  let badge = <Badge variant="secondary">minor</Badge>;
  if(role === "major") {
    badge = <Badge variant="primary">major</Badge>;
  }
  if(role === "lead") {
    badge = <Badge variant="warning">lead</Badge>;
  }

  const pdfTag = pdfLink ? <span>[<a href={pdfLink} download>PDF</a>]</span> : null;
  return (
    <div className="border-top py-3 mx-0" id={citekey}>
      <Row>
        <Col xs={3} className="pl-0">
          {imgComp}
        </Col>
        <Col xs={9} className="pr-0">
          {badge}
          <p>
            <b>{title}. </b>
            <i>{journal}. </i>
            Published {dateFormat(dateObj, "mmmm dS, yyyy")}
          </p>
          <p>Authors: {collapsedState ? authors_short : authors_annotated}</p>
          <p>[<a href={url}>Website</a>]{pdfTag}</p>
          <AbstractCollapse abstract={abstract} />
        </Col>
      </Row>
    </div>
  )
}

export default ({data}) => {
  const [selection, setSelection] = useState(false);
  return (
    <Layout pageTitle="Publications" activeNav="/publications">
      <SEO title="Stephan Schiffels - Publications" description="All peer-reviewed publications coauthored by Stephan Schiffels" />
      <p>
      <u>Legend:</u><br />
      <Badge variant="warning">lead</Badge>: Publications in which I had a leading role<br />
      <Badge variant="primary">major</Badge>: Publications to which I made substantial contributions<br />
      <Badge variant="secondary">minor</Badge>: Publications to which I made a minor contributions<br />
      </p>
      <Button variant="warning" className="mb-3" onClick={() => setSelection(!selection)}>{selection ? "Show all" : "Show selected only"}</Button>
      {data.allPublicationsJson.nodes.filter(node => !selection || node.role === "lead").map(node => {
        const l = node.pdf ? node.pdf.publicURL : null
        return (
          <PubEntry url={node.url}
                       journal={node.journal}
                       authors={node.authors}
                       title={node.title}
                       date={node.date}
                       abstract={node.abstract}
                       image={node.image}
                       role={node.role}
                       citekey={node.citekey}
                       pdfLink={l}/>
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
      citekey
      role
      pdf {
        publicURL
      }
      image {
        childImageSharp {
          fluid(maxHeight: 400, maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  pdfs: allFile(filter: {relativeDirectory: {eq: "pdfs"}}) {
    nodes {
      name
      publicURL
    }
  }
}`