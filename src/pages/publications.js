import React from "react"
import Layout from "../components/layout"
import {Row, Col} from "react-bootstrap"
import Img from "gatsby-image"
import { graphql } from 'gatsby'
import dateFormat from "dateformat"

const Author = ({name}) => {
  const name_fixed = name
    .replace(/\\~n/g,'ñ')
    .replace(/\\~o/g, 'õ')
    .replace(/\\'\\i/g, 'í')
    .replace(/\\"\\i/g, 'ï')
    .replace(/\\i/g,'ı')
    .replace(/\\c s/g,'ş')
    .replace(/\\c n/g, 'ņ')
    .replace(/\\c c/g, 'ç')
    .replace(/\\"a/g,'ä')
    .replace(/\\"o/g,'ö')
    .replace(/\\"u/g,'ü')
    .replace(/\\'a/g, 'á')
    .replace(/\\'e/g, 'é')
    .replace(/\\'o/g, 'ó')
    .replace(/\\'A/g, 'Á')
    .replace(/\\'u/g, 'ú')
    .replace(/\\`e/g, 'è')
    .replace(/\\^e/g, 'ê')
    .replace(/\\ss/g, 'ß')
    .replace(/\\o/g, 'ø')
    .replace(/\\aa/g, 'å')
    .replace(/\\v r/g, 'ř');
  if(name_fixed === "Stephan Schiffels")
    return (<u>{name_fixed}</u>)
  else 
    return (<span>{name_fixed}</span>)
}

const BibTexEntry = props => {
  const {image, url, pdf_link, bibtex_node : {date, authors, title, journal}} = props;
  const dateObj = new Date(date);
  let authors_annotated = []
  authors.slice(0, -1).forEach(function(a) {
    authors_annotated.push(<Author name={a} />);
    authors_annotated.push(<span>, </span>)
  })
  authors_annotated.push(<span> and </span>)
  authors_annotated.push(<Author name={authors.slice(-1)[0]} />)
  console.log(image);

  const imgComp = image ? <Img fluid={image} alt=""/> : <div></div>;

  return (
    <Row>
      <Col md={3}>
        {/* <Img fixed={image} alt="" /> */}
        {imgComp}
      </Col>
      <Col md={9}>
        <p>
          <a href={url}><b>{title}. </b></a>
          <i>{journal}. </i>
          Published <b>{dateFormat(dateObj, "mmmm dS, yyyy")}</b>
        </p>
        <p>Authors: {authors_annotated}</p>
        <p>
          <a href={pdf_link}>[Link to PDF]</a>
        </p>
      </Col>
    </Row>
  )
}

const getLinkDataForCiteKey = (linkList, citeKey) => {
  let ret = null;
  linkList.forEach(linkDat => {
    if(linkDat.citekey === citeKey)
      ret = linkDat;
  })
  return ret;
}

export default ({data}) => {
  if (data) {
    return (
      <Layout pageTitle="Publications">
        {data.pubs.nodes.map(node => {
          const linkDat = getLinkDataForCiteKey(data.linkData.nodes, node.key);
          const image = linkDat ? linkDat.image.childImageSharp.fluid : null;
          const url = linkDat ? linkDat.url : null;
          const pdf_link = linkDat ? linkDat.pdf_link : null;
          return (
            <BibTexEntry image={image}
                         bibtex_node={node}
                         url={url}
                         pdf_link={pdf_link} />
          );
          })
        }
      </Layout>
    )
  }
  else {
    return (
      <Layout pageTitle="Publications">
        No publications yet.
      </Layout>
    )
  }
}

export const query = graphql`
query {
  pubs: allReference {
    nodes {
      key
      title
      journal
      date
      authors
    }
  }
  linkData: allPublicationsLinksJson {
    nodes {
      url
      selected
      pdf_link
      citekey
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