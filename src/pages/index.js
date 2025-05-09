import React from "react"
import Layout from "../components/layout"
import {GatsbyImage} from "gatsby-plugin-image"
import { Carousel, Row, Col } from "react-bootstrap"
import { graphql, Link} from 'gatsby'
import "./index.css"
import Seo from "../components/seo"

const IndexPage = ({data}) => {
  return (
    <Layout pageTitle="Home" activeNav="/">
      <Seo title="Stephan Schiffels - Home" description="Stephan Schiffels is a W2 research group leader at the Max Planck Institute for Evolutionary Anthropology (MPI-EVA) in Leipzig, Germany." />
      <Row>
        <Col>
          <p>
          I am group leader for population genetics at the Department for Archaeogenetics of the <a href="http://www.eva.mpg.de">Max Planck Institute for Evolutionary Anthropology</a> in Leipzig, Germany. My <a href="https://www.eva.mpg.de/archaeogenetics/research-groups/population-genetics/">research group</a> at the MPI investigates human history by means of Genetics, and develops computational methods to model and analyse ancient and modern genomic data.
          </p>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage;