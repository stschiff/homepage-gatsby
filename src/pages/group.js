import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Portrait from "../components/portrait"
import "gatsby-image"

export default ({data}) => {
  return (
    <Layout pageTitle="Group">
      <Portrait
        name="Stephan Schiffels (PI)"
        image={data.imgStephan.childImageSharp.fixed}>
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
        image={data.imgThiseas.childImageSharp.fixed}>
            <li>since 2020: Postdoc at the MPI Jena</li>
            <li>since 2015: PhD student at the MPI Jena.</li>
            <li>2013-2014: MSc in Evolutionary Anthropology, University of Durham, UK.</li>
            <li>2010-2013: BSc in Genetics, University of York, UK.</li>
      </Portrait>
      <Portrait
        name="Ke Wang (PhD student)"
        image={data.imgKe.childImageSharp.fixed}>
          <li>since 2016: PhD student at the MPI Jena</li>
          <li>2015-2016: MSc in Genetics, University College London, UK</li>
          <li>2011-2015: BSc Biotechnology, Shandong University, China</li>
      </Portrait>
      <Portrait
        name="Luka Papac (PhD student)"
        image={data.imgLuka.childImageSharp.fixed}>
            <li>since 2016: PhD student at the MPI Jena, co-supervised by
                <a href="https://www.shh.mpg.de/person/42282/25500">Wolfgang Haak</a></li>
            <li>2014-2016: M.Phil in ancient DNA, University of Melbourne</li>
            <li>2009-2012: BSc(Hons) in Genetics, University of Melbourne</li>
      </Portrait>
      <Portrait
        name="Joscha Gretzinger (PhD student)"
        image={data.imgJoscha.childImageSharp.fixed}>
            <li>Since 2018: PhD student at the MPI Jena.</li>
            <li>2016-2018: Master Student in *Naturwissenschaftlicher Archaeologie*
                    , University of Tübingen, co-supervised by
                    <a href="http://www.iem.uzh.ch/en/people/abg/VerenaSchuenemann-.html">Verena Schünemann</a></li>
            <li>2013-2016 B.A. in Prehistory and Archaeology of the Middle Ages,
                    University of Tübingen</li>
      </Portrait>
      <Portrait
        name="Clemens Schmid (PhD student)"
        image={data.imgClemens.childImageSharp.fixed}>
            <li>Since 2019: PhD student at the MPI Jena.</li>
            <li>2015-2019: M.A. in Prehistoric and Historic Archaeology, University of Kiel</li>
            <li>2011-2014 B.A. in Prehistory and Medieval Archaeology, University of Tübingen</li>
      </Portrait>

      <h2>Affiliated researchers</h2>
      <Portrait
        name="Elina Salmela (Postdoc)"
        image={data.imgElina.childImageSharp.fixed}>
            <li>Since 2016: Affiliated Postdoc at the MPI Jena</li>
            <li>Since 2013: Postdoctoral researcher at the University of Helsinki</li>
            <li>2013: PhD at the University of Helsinki</li>
      </Portrait>

      <h2>Alumni</h2>
      <Portrait
        name="Suzanne Freilich (Erasmus student)"
        image={data.imgSuzanne.childImageSharp.fixed}>
            <li>March-August 2019: Visiting Erasmus student.</li>
            <li>PhD student at University of Vienna, Austria.</li>
      </Portrait>
      <Portrait
        name="Ezgi Altınışık (Erasmus student)"
        image={data.imgEzgi.childImageSharp.fixed}>
            <li>September 2018 - February 2019: Visiting Erasmus student</li>
            <li>Since 2015: PhD student with Pavel Flegontov from Ostrava University, Czech Republic.</li>
      </Portrait>
      <Portrait
        name="Martina Čížková (Erasmus student)"
        image={data.imgMartina.childImageSharp.fixed}>
            <li>January-June 2019: Visiting Erasmus student.</li>
            <li>PhD student at Charles University, Prague, Czech Republic.</li>
      </Portrait>


    </Layout>
  )
}

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fixed(width: 200, height: 200) {
        ...GatsbyImageSharpFixed
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
  imgKe: file(relativePath: {eq: "portraits/ke-portrait.jpg"}) {
    ...squareImage
  }
  imgLuka: file(relativePath: {eq: "portraits/luka-portrait.jpg"}) {
    ...squareImage
  }
  imgJoscha: file(relativePath: {eq: "portraits/joscha-portrait.jpg"}) {
    ...squareImage
  }
  imgClemens: file(relativePath: {eq: "portraits/Clemens.jpg"}) {
    ...squareImage
  }
  imgElina: file(relativePath: {eq: "portraits/elina-portrait.jpg"}) {
    ...squareImage
  }
  imgSuzanne: file(relativePath: {eq: "portraits/suzanne.jpg"}) {
    ...squareImage
  }
  imgEzgi: file(relativePath: {eq: "portraits/ezgi-portrait.jpg"}) {
    ...squareImage
  }
  imgMartina: file(relativePath: {eq: "portraits/martina.jpg"}) {
    childImageSharp {
      fixed(width: 200, height: 200, cropFocus: CENTER) {
        ...GatsbyImageSharpFixed
      }
    }
  }

}`