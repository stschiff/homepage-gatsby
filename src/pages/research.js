import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import {graphql} from "gatsby"

export default ({data}) => (
    <Layout pageTitle="Research">
        <p>
            I am group leader for population genetics at the Department for Archaeogenetics of the <a href="http://www.shh.mpg.de/en">Max Planck Institute for the Science of Human History in Jena</a>. My <a href="http://stephanschiffels.de/?page_id=8">group</a> at the MPI investigates human history by means of Genetics, and develops computational methods to model and analyse ancient and modern genomic data.
        </p>
        <section>
            <h2 id="computational-methods-for-genomic-analyses">
                Computational Methods for Genomic Analyses
            </h2>
            <Img alt="" fluid={data.header_img1.childImageSharp.fluid} width="100%"/>
            <p>
                An important part of our work consists of developing new methods to analyse genomic data in order to statistically infer details about the underlying evolutionary dynamics. At the heart of this methodological work is the growing amount of data available in the field of population genomics. When in 2010 there were only a handful of high quality human genomes completely sequenced, nowadays it is thousands and growing. The information that this data carries about our past demography, population diversification, and adaptation processes is vast, in principle. However, extracting this information out of genomes requires novel methods that are both based on sound foundations of population genetic theory and efficient enough to cope with the <em>Big Data </em>that the field of Genetics has become. Furthermore, a relatively novel requirement of such methods is the integration of ancient DNA, which is becoming increasingly available. Important examples of methods that I have developed in recent years and which are further developed in my group include <a href="http://www.github.com/stschiff/msmc">MSMC</a> (published in <a href="https://www.nature.com/articles/ng.3015">Schiffels and Durbin, 2014</a>) and <a href="http://www.github.com/stschiff/rarecoal">rarecoal</a> (published in <a href="https://www.nature.com/articles/ncomms10408">Schiffels et al. 2016</a> and <a href="https://www.biorxiv.org/content/early/2017/10/13/203018">Flegontov et al. 2017</a>]). We are also very active in developing bioinformatic tools and pipelines to help with processing sequencing data from ancient DNA. Examples for such tools include the <a href="https://github.com/stschiff/sequenceTools">sequenceTools package</a>, the <a href="https://github.com/stschiff/mergeAndClipFastq/tree/master">mergeAndClipFastq</a> program, and various processing tools in the <a href="https://github.com/stschiff/rarecoal-tools">rarecoal-tools</a> package.
            </p>
        </section>
        
        <section>
            <h2 id="human-history-through-genetics">
                Human History through genetics
            </h2>
            <Img alt="" fluid={data.header_img2.childImageSharp.fluid} width="100%"/>
            <p>
                One important goal of genomic analysis is to reconstruct human history by mean of genetics. Up until a few years ago, this was an endeavour that was mostly based on modern genomic data that is became increasingly available. As a major game changer, we are now able to not only indirectly look into the past through our population genetic models based on modern data, but directly through analysing ancient DNA. This relatively new field of "Genetic history" has lead to new insights into human history from Genetics in recent years, including on migration movements between regions and continents, the separation of people into spatially separated subpopulations, as well as changes in population size. Concrete examples of our research covers continental peopling events, for example into America (see <a href="http://science.sciencemag.org/content/349/6250/aab3884">Raghavan et al. 2015</a> and <a href="https://www.nature.com/articles/s41586-019-1251-y">Flegontov et al. 2017</a>), Australia (see <a href="https://www.nature.com/articles/nature18299">Malaspinas et al. 2016</a>), the early Anglo-Saxon migrations into Britain (see <a href="https://www.nature.com/articles/ncomms10408">Schiffels et al. 2016</a> and two blog posts <a href="http://stephanschiffels.de/?p=82">here</a> and <a href="http://stephanschiffels.de/?p=215">here</a>), or insights into population changes in <a href="https://www.nature.com/articles/ncomms15694">Egypt</a> within the last 2,000 years. Our work has also been picked up by the press, for example by the <a href="http://www.bbc.com/news/science-environment-35344663">BBC</a> or the <a href="https://www.washingtonpost.com/news/speaking-of-science/wp/2017/05/30/dna-from-ancient-egyptian-mummies-reveals-their-ancestry/?utm_term=.b647d2170fa6">Washington Post</a>.
            </p>
        </section>
        
        <section>
            <h2 id="population-genetic-theory">
                Population Genetic Theory
            </h2>
            <Img alt="" fluid={data.header_img3.childImageSharp.fluid} width="100%"/>
            <p>
                I received my PhD from the Institute for Theoretical Physics in Cologne, and my <a href="http://kups.ub.uni-koeln.de/4795/">dissertation</a> was in population genetic theory. Since then I have worked on a number of studies that explore evolutionary dynamics of adaptation, in particular in low recombining organisms or genomic regions. Examples for such studies include the effect of clonal interference on fixation probabilities of selected mutations (see <a href="http://www.genetics.org/content/189/4/1361">Schiffels et al. 2011</a>), how quantitative trait equilibria affect the the segregations of mutations at a genomic level (see <a href="http://iopscience.iop.org/article/10.1088/1742-5468/2013/01/P01012/meta">Nourmohammad et al. 2012</a>), and analyses of adaptive evolution under strong linkage in natural populations of <em>Drosophila melanogaster</em> (<a href="https://www.biorxiv.org/content/early/2017/11/29/226670">Schiffels et al. 2017)</a>.
            </p>
        </section>
    </Layout>
)

export const query = graphql`
query {
    header_img1: file(relativePath: {eq: "images/historical-genetics-images.jpg"}) {
        childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
        }      
    }
    header_img2: file(relativePath: {eq: "images/population-inference-methods-images.jpg"}) {
        childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
        }      
    }
    header_img3: file(relativePath: {eq: "images/theoretical-population-genetics-images.jpg"}) {
        childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
        }      
    }
}`