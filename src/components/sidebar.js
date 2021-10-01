import React from "react"
import { Row, Col, Badge } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import dateFormat from "dateformat"
// import styles from "./sidebar.module.css"

const BlogChunk = ({image_fluid, date, title, link}) => {
  const imgComp = image_fluid ? <GatsbyImage image={image_fluid} alt="Highlighted image from the blog post" className="border border-dark rounded-lg"/> : <div></div>;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={8} className="pl-0">
        <p>
          <u>{dateFormat(date, "mmmm dS, yyyy")}</u> <Badge variant="primary">New Blogpost</Badge> <br />
          <b><Link to={link}>{title}</Link></b>
        </p>
      </Col>
      <Col xs={4} className="pr-0">
        {imgComp}
      </Col>
    </Row>
  );
};

const AnnouncementChunk = ({image_fluid, title, date, link}) => {
  const imgComp = image_fluid ? <GatsbyImage image={image_fluid} alt="Highlighted image for that news item" className="border border-dark rounded-lg"/> : <div></div>;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={8} className="pl-0">
        <p>
          <u>{dateFormat(date, "mmmm dS, yyyy")}</u> <Badge variant="warning">News</Badge><br />
          <b><Link to={link}>{title}.</Link></b>
        </p>
      </Col>
      <Col xs={4} className="rounded">
        {imgComp}
      </Col>
    </Row>
  );
};

const PubChunk = ({image_fluid, title, journal, authors, date, citekey}) => {
  let authors_short = authors.length > 2 ? authors[0] + " et al." : (authors.length === 2 ? authors.join(" and ") : authors[0]);

  const imgComp = image_fluid ? <GatsbyImage image={image_fluid} alt="Highlighted image from that publication" className="border border-dark rounded-lg"/> : <div></div>;

  const pub_link = "/publications#" + citekey;
  return (
    <Row className="border-top py-3 mx-0">
      <Col xs={8} className="pl-0">
       <p>
          <u>{dateFormat(date, "mmmm dS, yyyy")}</u> <Badge variant="info">New Publication</Badge>
          <p>
            <b><Link to={pub_link}>{title}.</Link> </b>
            <i>{journal}. </i>
            By {authors_short}.
          </p>
        </p>
      </Col>
      <Col xs={4} className="rounded">
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
  return post_objects.concat(pub_objects);
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
                  gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.0)
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
          citekey
          role
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.0)
            }
          }
        }
      }
    }`
  );
  const allSidebarObjects = mergeSidebarObjects(
    data.posts.nodes,
    data.pubs.nodes //.filter(node => node.role !== "minor")
  ).sort((obj1, obj2) => obj1.date < obj2.date ? -1 : (obj1.date === obj2.date ? 0 : 1)).reverse().slice(0, 20);
  return (
    <aside style={{fontSize:"90%"}}>
      <h3>Recent News</h3>
      {allSidebarObjects.map(obj => {
        if(obj.type === "Blog") {
          const img = obj.node.childMdx.frontmatter.image ? obj.node.childMdx.frontmatter.image.childImageSharp.gatsbyImageData : null;
          return (
            <BlogChunk link={obj.node.childMdx.fields.slug}
                       title={obj.node.childMdx.frontmatter.title}
                       image_fluid={img}
                       date={obj.date}/>
          );
        } else if(obj.type === "Publication") {
          const img = obj.node.image ? obj.node.image.childImageSharp.gatsbyImageData : null;
          return (
            <PubChunk image_fluid={img}
                      title={obj.node.title}
                      authors={obj.node.authors}
                      journal={obj.node.journal}
                      date={obj.date}
                      citekey={obj.node.citekey}/>  
          );
        } else {
          const img = obj.node.childMdx.frontmatter.image ? obj.node.childMdx.frontmatter.image.childImageSharp.gatsbyImageData : null;
          return (
            <AnnouncementChunk link={obj.node.childMdx.fields.slug}
                               title={obj.node.childMdx.frontmatter.title}
                               image_fluid={img}
                               date={obj.date} />
          );
        }
      })}
    </aside>
  )
}
