import React from "react"
import Sidebar from "./sidebar"
import {Link} from "gatsby"
import {Nav, Navbar} from "react-bootstrap"
// import "./layout.module.css"

import { Container, Row, Col } from "react-bootstrap"

const ListLink = props => (
  <Nav.Link>
    <Link to={props.to}>
      {props.children}
    </Link>
  </Nav.Link>
)

const Header = () => (
<header>
  <Row>
    <Col>
      <h1>
        <Link to="/">Stephan Schiffels</Link>
      </h1>
      <h2>Population Genetics – Computational Methods - Human History</h2>
    </Col>
  </Row>
  <Navbar expand="md">
    <ListLink to="/">Home</ListLink>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <ListLink to="/research/">Research</ListLink>
      <ListLink to="/group/">Group</ListLink>
      <ListLink to="/publications/">Publications</ListLink>
      <ListLink to="/talks/">Talks</ListLink>
      <ListLink to="/resources/">Resources</ListLink>
      <ListLink to="/contact/">Contact</ListLink>
      <ListLink to="/blog/">Blog</ListLink>
    </Navbar.Collapse>
  </Navbar>
</header>
)

const Footer = () => (
  <footer>
    <Row>
      <Col>
        Powered by <a href="https://www.gatsbyjs.org">Gatsby</a> and custom CSS. Sourcecode available on <a href="https://github.com/stschiff/homepage-gatsby">github</a>.
      </Col>
    </Row>
  </footer>
)

export default ({ children, pageTitle }) => (
  <Container>
    <Header />
      <Row>
        <Col md={8}>
          <main>
          <h1>{pageTitle}</h1>
          {children}
          </main>
        </Col>
        <Col md={4} style={{background: "gray"}}>
          <Sidebar />
        </Col>
      </Row>
    <Footer />
  </Container>
)

