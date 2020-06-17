import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Carousel, Row, Col } from "react-bootstrap"
import { graphql, Link} from 'gatsby'
import "./index.css"
import SEO from "../components/seo"

export default ({data}) => {
  return (
    <Layout pageTitle="Home" activeNav="/">
      <SEO title="Stephan Schiffels - Home" description="Stephan Schiffels is a research group leader at the Max Planck Institute for the Science of Human History (MPI-SHH) in Jena, Germany. " />
      <Row className="justify-content-md-center">
        <Col>
      <Carousel controls={false} interval={3000}>
        <Carousel.Item>
          <Link to="/research">
            <Img alt="A human skeleton at an archaeological site and a schematic of a phylogenetic tree connecting human populations" fluid={data.imgGeneticHistory.childImageSharp.fluid} />
          </Link>
          <Carousel.Caption>
            <h3>Research: Genetic History</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/research">
            <Img alt="Schematics showing genealogical trees along genome sequences and within a structured population model" fluid={data.imgMethods.childImageSharp.fluid} />
          </Link>
          <Carousel.Caption>
            <h3>Research: Computational Methods</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/research">
            <Img alt="Photograph of the famous statue 'The Dying Gaul' symbolising the ancient Celts as seen by the Romans" fluid={data.imgERC.childImageSharp.fluid} />
          </Link>
          <Carousel.Caption>
            <h3>Research: ERC project MICROSCOPE</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/blog">
            <Img alt="A drawing of a Paleo-Eskimo woman with a baby child on her back as she stands in Northeast-Asia looking towards America" fluid={data.imgPaleoEskimo.childImageSharp.fluid} />
          </Link>
          <Carousel.Caption>
            <h3>Blog Posts</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/talks">
            <Img alt="Still image of Stephan Schiffels speaking at the TEDxTHBrandenburg" fluid={data.imgTEDxTalk.childImageSharp.fluid} />
          </Link>
          <Carousel.Caption>
            <h3>Talks</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </Col></Row>
      <Row>
        <Col>
          <p>
            I am group leader for population genetics at the Department for Archaeogenetics of the <a href="http://www.shh.mpg.de/en">Max Planck Institute for the Science of Human History in Jena</a>. My <a href="http://stephanschiffels.de/?page_id=8">group</a> at the MPI investigates human history by means of Genetics, and develops computational methods to model and analyse ancient and modern genomic data.
          </p>
        </Col>
      </Row>
    </Layout>
  )
}

export const carouselImage = graphql`
  fragment carouselImage on File {
    childImageSharp {
      fluid(maxWidth: 800, maxHeight:400, cropFocus: NORTH) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
query {
  imgERC: file(relativePath: {eq: "images/carousel/Dying_Gaul_fullres.jpg"}) {
    ...carouselImage
  }
  imgGeneticHistory: file(relativePath: {eq: "images/carousel/Carousel_genetic_history.jpg"}) {
    ...carouselImage
  }
  imgMethods: file(relativePath: {eq: "images/carousel/Carousel_methods.jpg"}) {
    ...carouselImage
  }
  imgPaleoEskimo: file(relativePath: {eq: "images/carousel/Carousel_PaleoEskimo.jpg"}) {
    ...carouselImage
  }
  imgTEDxTalk: file(relativePath: {eq: "images/carousel/Carousel_TEDxTalk.jpg"}) {
    ...carouselImage
  }
}`