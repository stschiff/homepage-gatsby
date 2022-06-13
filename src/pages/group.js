import React from "react"
import { graphql } from 'gatsby'
import {Row, Col} from "react-bootstrap"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import {FiExternalLink} from "react-icons/fi"
import Seo from "../components/seo"

const Portrait = ({name, image, children, link, role}) => {
  const link_elem = link ? (<a href={link}><FiExternalLink aria-label="External Link"/></a>) : <span></span>
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={4} className="pl-0">
        <GatsbyImage image={image} alt={"Portrait of " + name} />
      </Col>
      <Col xs={8} className="pr-0">
        <h4>{name} <small> - {role}</small>  {link_elem}</h4>
          <ul>
           {children}
          </ul>
      </Col>
    </Row>
  );
}
  
const GroupPage = ({data}) => {
  return (
    <Layout pageTitle="Group" activeNav="/group">
      <Seo title="Stephan Schiffels - Group" description="Research group members at the MPI-SHH" />
      <Portrait
        name="Stephan Schiffels"
        image={data.imgStephan.childImageSharp.gatsbyImageData}
        role="PI">
            <li> since 2020: W2 Research Group Leader at the 
              <a href="https://www.eva.mpg.de"> MPI for Evolutionary Anthropology</a>, Leipzig, Germany
            </li>
            <li> since 2015: Group leader at the
              <a href="http://www.shh.mpg.de"> MPI for the Science of Human History</a>, Jena, Germany.
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
        name="Dhananjaya Aththanayaka"
        image={data.imgDana.childImageSharp.gatsbyImageData}
        role="Student assistant">
            <li>Since 2021: Student assistant working on data management.</li>
            <li>Since 2020: Student at Deggendorf Institute of Technology (Healt Informatics)</li>
      </Portrait>
      <Portrait
        name="Joscha Gretzinger"
        image={data.imgJoscha.childImageSharp.gatsbyImageData}
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
        name="Lei Huang"
        image={data.imgLei.childImageSharp.gatsbyImageData}
        role="PhD student">
          <li>since 2022: PhD student at the MPI-EVA.</li>
          <li>2019-2021: MSc in Bioinformatics, University of Copenhagen, Denmark.</li>
          <li>2015-2019: BEng in Polymer Materials, Tsinghua University, China.</li>
      </Portrait>
      <Portrait
        name="Laura Lacher"
        image={data.imgLaura.childImageSharp.gatsbyImageData}
        link="https://www.shh.mpg.de/person/99004"
        role="PhD student">
            <li>since 2020: PhD student at the MPI Jena</li>
            <li>2018: Master of Science in <i>Naturwissenschaftliche Archäologie</i>, Eberhardt-Karls University, Tuebingen. Supervised by <a href="https://www.shh.mpg.de/3006/johanneskrause">Johannes Krause</a>, <a href="http://www.iem.uzh.ch/en/people/abg/VerenaSchuenemann-.html">Verena Schünemann</a> and <a href="https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/geowissenschaften/arbeitsgruppen/urgeschichte-naturwissenschaftliche-archaeologie/forschungsbereich/palaeoanthropologie/mitarbeiter/wahl-joachim/">Joachim Wahl</a></li>
            <li>2015: B.A. Archaeologie - Europa und vorderer Orient, Ludwig-Maximilians University, Munich</li>
      </Portrait>
      <Portrait
        name="Thiseas Lamnidis"
        image={data.imgThiseas.childImageSharp.gatsbyImageData}
        link="http://www.shh.mpg.de/person/45025/25522"
        role="Postdoc">
            <li>since 2020: Staff Scientist at the MPI Jena</li>
            <li>since 2015: PhD student at the MPI Jena.</li>
            <li>2013-2014: MSc in Evolutionary Anthropology, University of Durham, UK.</li>
            <li>2010-2013: BSc in Genetics, University of York, UK.</li>
      </Portrait>
      <Portrait
        name="Angela Mötsch"
        image={data.imgAngela.childImageSharp.gatsbyImageData}
        link="https://www.shh.mpg.de/person/60441/2375"
        role="Postdoc">
            <li>Since 2020: Postdoc (50%) ERC project MICROSCOPE</li>
            <li>Since 2018: Sample management and project organization at the Max Planck – Harvard Research Center for the Archaeoscience of the Ancient Mediterranean (MHAAM)</li>
            <li>2015-2018: Postdoc in the BMBF-funded project “Meanings and Functions of Mediterranean Imports in Early Iron Age Central Europe“, Cultural Heritage Department of Baden-Württemberg (2015-2018)</li>
            <li>2005-2010: Excavations and PhD (University of Kiel, subject: Archaeology) on the subject of the site of Mont Lassois, Burgundy, France.</li>
      </Portrait>
      <Portrait
        name="Clemens Schmid"
        image={data.imgClemens.childImageSharp.gatsbyImageData}
        link="https://www.shh.mpg.de/person/103205/25500"
        role="PhD student">
            <li>Since 2019: PhD student at the MPI Jena.</li>
            <li>2015-2019: M.A. in Prehistoric and Historic Archaeology, University of Kiel</li>
            <li>2011-2014 B.A. in Prehistory and Medieval Archaeology, University of Tübingen</li>
      </Portrait>
      <Portrait
        name="Sophie Seng"
        image={data.imgSophie.childImageSharp.gatsbyImageData}
        role="Technical assistant">
            <li>Since 2019 technical Assistant at the MPI for the Science of Human History , since 2021 for the ERC project MICROSCOPE</li>
            <li>2015-2017  Master Student in chemical Biology (FSU Jena)</li>
            <li>2013-2015  Master Student in Biochemistry (FSU Jena)</li>
            <li>2010-2013  B.Sc.in Biology/Microbiology (FSU Jena)</li>
      </Portrait>

      <h2>Affiliated researchers</h2>
      <Portrait
        name="Elina Salmela"
        image={data.imgElina.childImageSharp.gatsbyImageData}
        link="http://blogs.helsinki.fi/esalmela/"
        role="Postdoc">
            <li>Since 2016: Affiliated Postdoc at the MPI Jena</li>
            <li>Since 2013: Postdoctoral researcher at the University of Helsinki</li>
            <li>2013: PhD at the University of Helsinki</li>
      </Portrait>
      <Portrait
        name="Suzanne Freilich"
        image={data.imgSuzanne.childImageSharp.gatsbyImageData}
        role="Affiliated Postdoc">
            <li>Since 2022: Postdoc at MPI-EVA under supervision of Dr. Alissa Mittnik</li>
            <li>2019-2022: Visiting PhD student in our group.</li>
            <li>PhD student at University of Vienna, Austria.</li>
      </Portrait>


      <h2>Alumni</h2>
      <Portrait
        name="Ke Wang"
        image={data.imgKe.childImageSharp.gatsbyImageData}
        link="http://www.shh.mpg.de/employees/50975/25522"
        role="Postdoc">
          <li>Since 2022: Faculty member at Fudan University, Shanghai</li>
          <li>2020-2022: Postdoc at the MPI-EVA in Leipzig</li>
          <li>2016-2020: PhD student at the MPI Jena</li>
          <li>2015-2016: MSc in Genetics, University College London, UK</li>
          <li>2011-2015: BSc Biotechnology, Shandong University, China</li>
      </Portrait>
      <Portrait
        name="Ezgi Altınışık"
        image={data.imgEzgi.childImageSharp.gatsbyImageData}
        role="Erasmus student">
            <li>September 2018 - February 2019: Visiting Erasmus student</li>
            <li>Since 2015: PhD student with Pavel Flegontov from Ostrava University, Czech Republic.</li>
      </Portrait>
      <Portrait
        name="Martina Čížková"
        image={data.imgMartina.childImageSharp.gatsbyImageData}
        role="Erasmus student">
            <li>January-June 2019: Visiting Erasmus student.</li>
            <li>PhD student at Charles University, Prague, Czech Republic.</li>
      </Portrait>
      <Portrait
        name="Luka Papac"
        image={data.imgLuka.childImageSharp.gatsbyImageData}
        link="http://www.shh.mpg.de/employees/50502/25522"
        role="PhD Student">
            <li>since 2021: Postdoc at the Institute of Archaeology of the Czech Academy of Sciences, Prague</li>
            <li>2016-2020: PhD student at the MPI Jena, co-supervised by <a href="https://www.shh.mpg.de/person/42282/25500">Wolfgang Haak</a></li>
            <li>2014-2016: M.Phil in ancient DNA, University of Melbourne</li>
            <li>2009-2012: BSc(Hons) in Genetics, University of Melbourne</li>
      </Portrait>
      <Portrait
        name="Rita Radzeviciute"
        image={data.imgRita.childImageSharp.gatsbyImageData}
        link="https://www.shh.mpg.de/person/59687"
        role="Technical assistant">
            <li>2021: continuing as lab supervisor at the MPI-EVA</li>
            <li>2020-2021: Technical Assistant for the ERC project MICROSCOPE</li>
            <li>2010-2012: MSc in Zoology, University of Vilnius, Lithuania.</li>
            <li>2006-2010: BSc in Biologie, University of Vilnius, Lithuania.</li>
      </Portrait>
      <Portrait
        name="Tina Saupe"
        image={data.imgTina.childImageSharp.gatsbyImageData}
        role="Undergraduate student">
          <li>since 2018: PhD student at the Estonian Biocentre, Institute of Genomics, University of Tartu, Estonia</li>
          <li>2016-2018: MSc in Anthropoloy, Johannes Gutenberg University Mainz, Germany</li>
          <li>2012-2016: BSc in Biotechnology/Bioinformatics; University of Applied Sciences, Mittweida, Germany. Bachelor's thesis supervised at MPI-SHH, Jena, Germany</li>
          <li>2014-2015: BSc in Applied Bioscience with Forensic Investigation, University of the West of Scotland, Hamilton Campus, United Kingdom</li>
      </Portrait>
      <Portrait
        name="Margherita Vanni"
        image={data.imgMarg.childImageSharp.gatsbyImageData}
        role="Erasmus Student">
          <li>March - September 2021: Erasmus student at the MPI Jena</li>
          <li>2018-2020: MSc Anthropological Sciences at University of Florence, Italy</li>
          <li>2016-2018: BSc Natural Sciences at University of Florence, Italy</li>
      </Portrait>
    </Layout>
  )
}

export default GroupPage;

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.0)
    }
  }
`

export const query = graphql`
query {
  imgDana: file(relativePath: {eq: "images/portraits/Dana_portrait.jpg"}) {
    ...squareImage
  }
  imgLei: file(relativePath: {eq: "images/portraits/lei_huang.jpg"}) {
    ...squareImage
  }
  imgSophie: file(relativePath: {eq: "images/portraits/sophie-seng.jpg"}) {
    ...squareImage
  }
  imgStephan: file(relativePath: {eq: "images/portraits/Portrait_Website.jpg"}) {
    ...squareImage
  }
  imgThiseas: file(relativePath: {eq: "images/portraits/thiseas_portrait.jpg"}) {
    ...squareImage
  }
  imgKe: file(relativePath: {eq: "images/portraits/ke-portrait.jpg"}) {
    ...squareImage
  }
  imgMarg: file(relativePath: {eq: "images/portraits/margherita-portrait.jpg"}) {
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
      gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.0, transformOptions: {cropFocus: NORTH})
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
  imgTina: file(relativePath: {eq: "images/portraits/tina_saupe.jpg"}) {
    ...squareImage
  }
  imgMartina: file(relativePath: {eq: "images/portraits/martina.jpg"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.0, transformOptions: {cropFocus: CENTER})
    }
  }
}`