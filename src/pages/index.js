import React from "react"
import Layout from "../components/layout"
import {GatsbyImage} from "gatsby-plugin-image"
import { graphql, Link} from 'gatsby'
import Seo from "../components/seo"

const IndexPage = ({data}) => {
  return (
    <Layout pageTitle="Home" activeNav="/">
      <Seo title="Stephan Schiffels - Home" description="Stephan Schiffels is a W2 research group leader at the Max Planck Institute for Evolutionary Anthropology (MPI-EVA) in Leipzig, Germany." />
      <Row className="justify-content-md-center">
        <Col>
      <Carousel controls={false} interval={3000}>
        <Carousel.Item>
          <Link to="/research">
            <GatsbyImage alt="A human skeleton at an archaeological site and a schematic of a phylogenetic tree connecting human populations" image={data.imgGeneticHistory.childImageSharp.gatsbyImageData} />
          </Link>
          <Carousel.Caption>
            <h3>Research: Genetic History</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/research">
            <GatsbyImage alt="Schematics showing genealogical trees along genome sequences and within a structured population model" image={data.imgMethods.childImageSharp.gatsbyImageData} />
          </Link>
          <Carousel.Caption>
            <h3>Research: Computational Methods</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/research">
            <GatsbyImage alt="Photograph of the famous statue 'The Dying Gaul' symbolising the ancient Celts as seen by the Romans" image={data.imgERC.childImageSharp.gatsbyImageData} />
          </Link>
          <Carousel.Caption>
            <h3>Research: ERC project MICROSCOPE</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/blog">
            <GatsbyImage alt="A drawing of a Paleo-Eskimo woman with a baby child on her back as she stands in Northeast-Asia looking towards America" image={data.imgPaleoEskimo.childImageSharp.gatsbyImageData} />
          </Link>
          <Carousel.Caption>
            <h3>Blog Posts</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/talks">
            <GatsbyImage alt="Still image of Stephan Schiffels speaking at the TEDxTHBrandenburg" image={data.imgTEDxTalk.childImageSharp.gatsbyImageData} />
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
            I am W2 Max Planck Research Group Leader for population genetics at the Department for Archaeogenetics of the <a href="https://www.eva.mpg.de">Max Planck Institute for Evolutionary Anthropology in Leipzig</a>. My <Link to="/group">group</Link> at the MPI investigates human history by means of Genetics, and develops computational methods to model and analyse ancient and modern genomic data.
          </p>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage;

export const carouselImage = graphql`
  fragment carouselImage on File {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2.0, transformOptions: {cropFocus: NORTH})
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