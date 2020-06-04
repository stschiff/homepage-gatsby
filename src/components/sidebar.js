import React from "react"
import { Row, Col, Badge } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import dateFormat from "dateformat"
// import styles from "./sidebar.module.css"

const BlogChunk = ({image_fluid, date, title, link}) => {
  const imgComp = image_fluid ? <Img fluid={image_fluid} alt="" className="border border-dark rounded-lg"/> : <div></div>;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={8} className="pl-0">
        <p>
          <u>{dateFormat(date, "mmmm dS, yyyy")}</u> <Badge variant="primary">Blog</Badge> <br />
          <b>{title}</b>
          <p><i>Read more in <Link to="/blog">Blog</Link></i></p>
        </p>
      </Col>
      <Col xs={4} className="pr-0">
        {imgComp}
      </Col>
    </Row>
  );
};

const AnnouncementChunk = ({image_fluid, title, date, link}) => {
  const imgComp = image_fluid ? <Img fluid={image_fluid} alt="" className="border border-dark rounded-lg"/> : <div></div>;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={8} className="pl-0">
        <p>
          <u>{dateFormat(date, "mmmm dS, yyyy")}</u> <Badge variant="warning">Announcement</Badge><br />
          <a href={link}>{title}.</a>
        </p>
      </Col>
      <Col xs={4} className="pr-0">
        {imgComp}
      </Col>
    </Row>
  );
};

const PubChunk = ({image_fluid, title, journal, authors, date}) => {
  let authors_short = authors.length > 2 ? authors[0] + " et al." : (authors.length === 2 ? authors.join(" and ") : authors[0]);

  const imgComp = image_fluid ? <Img fluid={image_fluid} alt="" className="border border-dark rounded-lg"/> : <div></div>;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={8} className="pl-0">
       <p>
          <u>{dateFormat(date, "mmmm dS, yyyy")}</u> <Badge variant="info">Publication</Badge>
          <p>
            <b>{title}. </b>
            <i>{journal}. </i>
            By {authors_short}. <p><i>See <Link to="/publications">Publications</Link></i></p>
          </p>
        </p>
      </Col>
      <Col xs={4} className="pr-0">
        {imgComp}
      </Col>
    </Row>
  )
}

const mergeSidebarObjects = (post_nodes, pub_nodes) => {
  const extract_date = str => new Date(str.substring(0, 10));
  const post_objects = post_nodes.map(post_node => {
    return {
      type : post_node.childMdx.frontmatter.isBlogPost ? "Blog" : "Announcement",
      date : extract_date(post_node.name),
      node : post_node
    }
  });
  const pub_objects = pub_nodes.map(pub_node => {
    return {
      type : "Publication",
      date : new Date(pub_node.date),
      node : pub_node,
    }
  });
  return post_objects.concat(pub_objects).slice(0, 20);
}

export default () => {
  const data = useStaticQuery(
    graphql`
    query {
      posts: allFile(filter: {relativeDirectory: {eq: "posts"}}) {
        nodes {
          name
          childMdx {
            fields {
              slug
            }
            excerpt
            frontmatter {
              title
              isBlogPost
              image {
                childImageSharp {
                  fluid(maxHeight: 400, maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      pubs: allPublicationsJson {
        nodes {
          title
          journal
          date
          authors
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
  );
  const allSidebarObjects = mergeSidebarObjects(data.posts.nodes, data.pubs.nodes).sort(
    (obj1, obj2) => obj1.date < obj2.date ? -1 : (obj1.date === obj2.date ? 0 : 1)
  ).reverse();
  return (
    <aside style={{fontSize:"90%"}}>
      <h3>Recent News</h3>
      {allSidebarObjects.map(obj => {
        if(obj.type === "Blog") {
          const img = obj.node.childMdx.frontmatter.image ? obj.node.childMdx.frontmatter.image.childImageSharp.fluid : null;
          return (
            <BlogChunk link={obj.node.childMdx.fields.slug}
                       title={obj.node.childMdx.frontmatter.title}
                       image_fluid={img}
                       date={obj.date}/>
          );
        } else if(obj.type === "Publication") {
          const img = obj.node.image ? obj.node.image.childImageSharp.fluid : null;
          return (
            <PubChunk image_fluid={img}
                      title={obj.node.title}
                      authors={obj.node.authors}
                      journal={obj.node.journal}
                      date={obj.date}/>  
          );
        } else {
          const img = obj.node.childMdx.frontmatter.image ? obj.node.childMdx.frontmatter.image.childImageSharp.fluid : null;
          return (
            <AnnouncementChunk link={obj.node.childMdx.frontmatter.link}
                               title={obj.node.childMdx.frontmatter.title}
                               image_fluid={img}
                               date={obj.date} />
          );
        }
      })}
    </aside>
  )
}
