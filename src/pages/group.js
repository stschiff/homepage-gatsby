import React from "react"
import { graphql } from 'gatsby'
import {Row, Col} from "react-bootstrap"
import Img from "gatsby-image"
import Layout from "../components/layout"
import "gatsby-image"
import {FiExternalLink} from "react-icons/fi"
import SEO from "../components/seo"

const Portrait = ({name, image, children, link, role}) => {
  const link_elem = link ? (<a href={link}><FiExternalLink aria-label="External Link"/></a>) : <span></span>
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={4} className="pl-0">
        <Img fluid={image} alt={"Portrait of " + name} />
      </Col>
      <Col xs={8} className="pr-0">
        <h4>{name} <small>{role}</small>  {link_elem}</h4>
          <ul>
           {children}
          </ul>
      </Col>
    </Row>
  );
}
  

export default ({data}) => {
  return (
    <Layout pageTitle="Group" activeNav="/group">
      <SEO title="Stephan Schiffels - Group" description="Research group members at the MPI-SHH" />
      <Portrait
        name="Stephan Schiffels"
        image={data.imgStephan.childImageSharp.fluid}
        role="PI">
            <li> since 2015: Group leader at the <a href="http://www.shh.mpg.de">
                MPI for the Science of Human History</a>, Jena, Germany.
            </li>
            <li>2012-2015: Postdoctoral Fellow in the group of Richard Durbin at the
                Wellcome Trust Sanger Institute, Hinxton, Cambridge, UK.
                <i>EMBO-Longterm Fellow</i> from 2012 through 2014.
            </li>
            <li>
                2008-2011: PhD in Theoretical Physics at the University of Cologne,
                funded by the <i>Deutsche Studienstiftung</i> (German National Merit
                Foundation).
            </li>
      </Portrait>
      <Portrait
        name="Joscha Gretzinger"
        image={data.imgJoscha.childImageSharp.fluid}
        link="http://www.shh.mpg.de/person/91521/25500"
        role="PhD student">
            <li>Since 2018: PhD student at the MPI Jena.</li>
            <li>2016-2018: Master Student in <i>Naturwissenschaftlicher Archaeologie</i>
                    , University of Tübingen, co-supervised by
                    <a href="http://www.iem.uzh.ch/en/people/abg/VerenaSchuenemann-.html">Verena Schünemann</a></li>
            <li>2013-2016 B.A. in Prehistory and Archaeology of the Middle Ages,
                    University of Tübingen</li>
      </Portrait>
      <Portrait
        name="Laura Lacher"
        image={data.imgLaura.childImageSharp.fluid}
        link="https://www.shh.mpg.de/person/99004"
        role="PhD student">
            <li>since 2020: PhD student at the MPI Jena</li>
            <li>2018: Master of Science in <i>Naturwissenschaftliche Archäologie</i>, Eberhardt-Karls University, Tuebingen. Supervised by <a href="https://www.shh.mpg.de/3006/johanneskrause">Johannes Krause</a>, <a href="http://www.iem.uzh.ch/en/people/abg/VerenaSchuenemann-.html">Verena Schünemann</a> and <a href="https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/geowissenschaften/arbeitsgruppen/urgeschichte-naturwissenschaftliche-archaeologie/forschungsbereich/palaeoanthropologie/mitarbeiter/wahl-joachim/">Joachim Wahl</a></li>
            <li>2015: B.A. Archaeologie - Europa und vorderer Orient, Ludwig-Maximilians University, Munich</li>
      </Portrait>
      <Portrait
        name="Thiseas Lamnidis"
        image={data.imgThiseas.childImageSharp.fluid}
        link="http://www.shh.mpg.de/person/45025/25522"
        role="Staff Scientist">
            <li>since 2020: Staff Scientist at the MPI Jena</li>
            <li>since 2015: PhD student at the MPI Jena.</li>
            <li>2013-2014: MSc in Evolutionary Anthropology, University of Durham, UK.</li>
            <li>2010-2013: BSc in Genetics, University of York, UK.</li>
      </Portrait>
      <Portrait
        name="Angela Mötsch"
        image={data.imgAngela.childImageSharp.fluid}
        link="https://www.shh.mpg.de/person/60441/2375"
        role="Postdoc">
            <li>Since 2020: Postdoc (50%) ERC project MICROSCOPE</li>
            <li>Since 2018: Sample management and project organization at the Max Planck – Harvard Research Center for the Archaeoscience of the Ancient Mediterranean (MHAAM)</li>
            <li>2015-2018: Postdoc in the BMBF-funded project “Meanings and Functions of Mediterranean Imports in Early Iron Age Central Europe“, Cultural Heritage Department of Baden-Württemberg (2015-2018)</li>
            <li>2005-2010: Excavations and PhD (University of Kiel, subject: Archaeology) on the subject of the site of Mont Lassois, Burgundy, France.</li>
      </Portrait>
      <Portrait
        name="Luka Papac"
        image={data.imgLuka.childImageSharp.fluid}
        link="http://www.shh.mpg.de/employees/50502/25522"
        role="PhD Student">
            <li>since 2016: PhD student at the MPI Jena, co-supervised by <a href="https://www.shh.mpg.de/person/42282/25500">Wolfgang Haak</a></li>
            <li>2014-2016: M.Phil in ancient DNA, University of Melbourne</li>
            <li>2009-2012: BSc(Hons) in Genetics, University of Melbourne</li>
      </Portrait>
      <Portrait
        name="Rita Radzeviciute"
        image={data.imgRita.childImageSharp.fluid}
        link="https://www.shh.mpg.de/person/59687"
        role="Technical assistant">
            <li>since 2020: Technical Assistant for the ERC project MICROSCOPE</li>
            <li>2010-2012: MSc in Zoology, University of Vilnius, Lithuania.</li>
            <li>2006-2010: BSc in Biologie, University of Vilnius, Lithuania.</li>
      </Portrait>
      <Portrait
        name="Clemens Schmid"
        image={data.imgClemens.childImageSharp.fluid}
        link="https://www.shh.mpg.de/person/103205/25500"
        role="PhD student">
            <li>Since 2019: PhD student at the MPI Jena.</li>
            <li>2015-2019: M.A. in Prehistoric and Historic Archaeology, University of Kiel</li>
            <li>2011-2014 B.A. in Prehistory and Medieval Archaeology, University of Tübingen</li>
      </Portrait>
      <Portrait
        name="Ke Wang"
        image={data.imgKe.childImageSharp.fluid}
        link="http://www.shh.mpg.de/employees/50975/25522"
        role="PhD student">
          <li>since 2016: PhD student at the MPI Jena</li>
          <li>2015-2016: MSc in Genetics, University College London, UK</li>
          <li>2011-2015: BSc Biotechnology, Shandong University, China</li>
      </Portrait>

      <h2>Affiliated researchers</h2>
      <Portrait
        name="Elina Salmela"
        image={data.imgElina.childImageSharp.fluid}
        link="http://blogs.helsinki.fi/esalmela/"
        role="Postdoc">
            <li>Since 2016: Affiliated Postdoc at the MPI Jena</li>
            <li>Since 2013: Postdoctoral researcher at the University of Helsinki</li>
            <li>2013: PhD at the University of Helsinki</li>
      </Portrait>

      <h2>Alumni</h2>
      <Portrait
        name="Suzanne Freilich"
        image={data.imgSuzanne.childImageSharp.fluid}
        role="Erasmus student">
            <li>March-August 2019: Visiting Erasmus student.</li>
            <li>PhD student at University of Vienna, Austria.</li>
      </Portrait>
      <Portrait
        name="Ezgi Altınışık"
        image={data.imgEzgi.childImageSharp.fluid}
        role="Erasmus student">
            <li>September 2018 - February 2019: Visiting Erasmus student</li>
            <li>Since 2015: PhD student with Pavel Flegontov from Ostrava University, Czech Republic.</li>
      </Portrait>
      <Portrait
        name="Martina Čížková"
        image={data.imgMartina.childImageSharp.fluid}
        role="Erasmus student">
            <li>January-June 2019: Visiting Erasmus student.</li>
            <li>PhD student at Charles University, Prague, Czech Republic.</li>
      </Portrait>


    </Layout>
  )
}

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fluid(maxWidth: 400, maxHeight: 400) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
query {
  imgStephan: file(relativePath: {eq: "images/portraits/Portrait_Website.jpg"}) {
    ...squareImage
  }
  imgThiseas: file(relativePath: {eq: "images/portraits/thiseas_portrait.jpg"}) {
    ...squareImage
  }
  imgKe: file(relativePath: {eq: "images/portraits/ke-portrait.jpg"}) {
    ...squareImage
  }
  imgLuka: file(relativePath: {eq: "images/portraits/luka-portrait.jpg"}) {
    ...squareImage
  }
  imgJoscha: file(relativePath: {eq: "images/portraits/joscha-portrait.jpg"}) {
    ...squareImage
  }
  imgClemens: file(relativePath: {eq: "images/portraits/Clemens.jpg"}) {
    ...squareImage
  }
  imgRita: file(relativePath: {eq: "images/portraits/rita_radzeviciute.jpg"}) {
    ...squareImage
  }
  imgLaura: file(relativePath: {eq: "images/portraits/laura_lacher.jpg"}) {
    childImageSharp {
      fluid(maxWidth: 400, maxHeight: 400, cropFocus: NORTH) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imgAngela: file(relativePath: {eq: "images/portraits/angela_motsch.jpg"}) {
    ...squareImage
  }
  imgElina: file(relativePath: {eq: "images/portraits/elina-portrait.jpg"}) {
    ...squareImage
  }
  imgSuzanne: file(relativePath: {eq: "images/portraits/suzanne.jpg"}) {
    ...squareImage
  }
  imgEzgi: file(relativePath: {eq: "images/portraits/ezgi-portrait.jpg"}) {
    ...squareImage
  }
  imgMartina: file(relativePath: {eq: "images/portraits/martina.jpg"}) {
    childImageSharp {
      fluid(maxWidth: 400, maxHeight: 400, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }

}`