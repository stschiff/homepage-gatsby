import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Portrait from "../components/portrait"

export default ({data}) => {
  console.log(data)
  return (
    <Layout>
      <Portrait
        name="Stephan Schiffels (PI)"
        image={data.imgStephan.childImageSharp.fixed.src}>
            <li> since 2015: Group leader at the <a href="http://www.shh.mpg.de">
                MPI for the Science of Human History</a>, Jena, Germany.
            </li>
            <li>2012-2015: Postdoctoral Fellow in the group of Richard Durbin at the
                Wellcome Trust Sanger Institute, Hinxton, Cambridge, UK.
                *EMBO-Longterm Fellow* from 2012 through 2014.
            </li>
            <li>
                2008-2011: PhD in Theoretical Physics at the University of Cologne,
                funded by the *Deutsche Studienstiftung* (German National Merit
                Foundation).
            </li>
      </Portrait>
      <Portrait
        name="Thiseas Lamnidis (Postdoc)"
        image={data.imgThiseas.childImageSharp.fixed.src}>
            <li>since 2020: Postdoc at the MPI Jena</li>
            <li>since 2015: PhD student at the MPI Jena.</li>
            <li>2013-2014: MSc in Evolutionary Anthropology, University of Durham, UK.</li>
            <li>2010-2013: BSc in Genetics, University of York, UK.</li>
      </Portrait>
    </Layout>
  )
}

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fixed(width: 200, height: 200) {
        src
      }
    }
  }
`

export const query = graphql`
query {
  imgStephan: file(relativePath: {eq: "portraits/Portrait_Website.jpg"}) {
    ...squareImage
  }
  imgThiseas: file(relativePath: {eq: "portraits/thiseas_portrait.jpg"}) {
    ...squareImage
  }
}`