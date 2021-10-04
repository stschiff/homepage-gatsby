import React from "react"
import Sidebar from "./sidebar"
import {Link} from "gatsby"
import {Nav, Navbar} from "react-bootstrap"

import { Container, Row, Col } from "react-bootstrap"
import { FaTwitter, FaGithub, FaMedium, FaResearchgate } from "react-icons/fa";

const ListLink = props => {
  const cl = props.to === props.activeNav ? "nav-link active" : "nav-link";
  return (
    <Nav.Item>
      <Link to={props.to} className={cl}>
        {props.children}
      </Link>
    </Nav.Item>
  );
}

const Header = ({activeNav}) => (
<header>
  <Row>
    <Col md={9}>
      <h1 className="display-4 mt-3">Stephan Schiffels</h1>
      <p className="font-weight-light">Population Genetics – Computational Methods - Human History</p>
    </Col>
    <Col md={3}>
      <h2 className="mt-md-3 float-md-right">
        <Navbar>
        <Nav>
        <Nav.Item><Nav.Link href="https://twitter.com/stschiff"><FaTwitter /></Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="https://github.com/stschiff"><FaGithub /></Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="https://medium.com/stephan-schiffels"><FaMedium /></Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="https://www.researchgate.net/profile/Stephan_Schiffels"><FaResearchgate /></Nav.Link></Nav.Item>
        </Nav>
        </Navbar>
      </h2>
    </Col>
  </Row>
  <Navbar expand="md" className="mb-5 border-top border-bottom">
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <ListLink to="/" activeNav={activeNav}>Home</ListLink>
        <ListLink to="/research" activeNav={activeNav}>Research</ListLink>
        <ListLink to="/group" activeNav={activeNav}>Group</ListLink>
        <ListLink to="/publications" activeNav={activeNav}>Publications</ListLink>
        <ListLink to="/talks" activeNav={activeNav}>Talks</ListLink>
        <ListLink to="/resources" activeNav={activeNav}>Resources</ListLink>
        <ListLink to="/contact" activeNav={activeNav}>Contact</ListLink>
        <ListLink to="/blog" activeNav={activeNav}>Blog</ListLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</header>
)

const Footer = () => (
  <footer className="border-top mt-4">
    <Row>
      <Col className="text-right">
        Powered by <a href="https://www.gatsbyjs.org">Gatsby</a> and <a href="https://getbootstrap.com">bootstrap</a>.
        Sourcecode available on <a href="https://github.com/stschiff/homepage-gatsby">github</a>.
      </Col>
    </Row>
  </footer>
)

const LayoutComponent = ({ activeNav, children, pageTitle }) => (
  <Container>
    <Header activeNav={activeNav}/>
    <Row className="justify-content-between">
      <Col lg={7}>
        <main>
        <h2>{pageTitle}</h2>
        {children}
        </main>
      </Col>
      <Col lg={4}>
        <Sidebar />
      </Col>
    </Row>
    <Footer />
  </Container>
)

export default LayoutComponent;
