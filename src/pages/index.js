import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Carousel, Row, Col } from "react-bootstrap"
import { graphql } from 'gatsby'
import "./index.css"

export default ({data}) => {
  return (
    <Layout pageTitle="Home" activeNav="/">
      <Row className="justify-content-md-center">
        <Col md={10}>
      <Carousel controls={false}>
        <Carousel.Item>
          <Img alt="Research: ERC project MICROSCOPE" fluid={data.imgERC.childImageSharp.fluid} />
          <Carousel.Caption>
            <h3>Research: ERC project MICROSCOPE</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Img alt="Research: Genetic History" fluid={data.imgGeneticHistory.childImageSharp.fluid} />
          <Carousel.Caption>
            <h3>Research: Genetic History</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Img alt="Research: Computational Methods" fluid={data.imgMethods.childImageSharp.fluid} />
          <Carousel.Caption>
            <h3>Research: Computational Methods</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Img alt="Blog Posts" fluid={data.imgPaleoEskimo.childImageSharp.fluid} />
          <Carousel.Caption>
            <h3>Blog Posts</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Img alt="Talks" fluid={data.imgTEDxTalk.childImageSharp.fluid} />
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
  imgERC: file(relativePath: {eq: "images/carousel/Carousel_ERC.jpg"}) {
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