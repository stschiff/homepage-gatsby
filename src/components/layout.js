import React from "react"
import Sidebar from "./sidebar"
import {Link} from "gatsby"

import { FaTwitter, FaGithub, FaMedium, FaResearchgate, FaMastodon } from "react-icons/fa";

import "~bulma/bulma.sass";

const ListLink = props => {
  const cl = props.to === props.activeNav ? "navbar-item is-active" : "navbar-item";
  return (
    <Nav.Item>
      <Link to={props.to} className={cl}>
        {props.children}
      </Link>
    </Nav.Item>
  );
}

const Header = ({activeNav}) => (
<header className="section">
  <h1 className="title is-1"><Link to="/">Stephan Schiffels</Link></h1>
  <h2 className="subtitle">Population Genetics – Computational Methods - Human History</h2>
  <nav className="navbar">
    <div class="navbar-brand">
      <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <ListLink to="/" activeNav={activeNav}>Home</ListLink>
          <ListLink to="/research" activeNav={activeNav}>Research</ListLink>
          <ListLink to="/publications" activeNav={activeNav}>Publications</ListLink>
          <ListLink to="/talks" activeNav={activeNav}>Talks</ListLink>
          <ListLink to="/videos" activeNav={activeNav}>Talks</ListLink>
          <ListLink to="/resources" activeNav={activeNav}>Resources</ListLink>
          <ListLink to="/blog" activeNav={activeNav}>Blog</ListLink>
        </div>
        <div class="navbar end">
          <Link className="navbar-item" to="https://www.eva.mpg.de/archaeogenetics/staff/stephan-schiffels/"><img src="/images/mpi_logo.jpg" /></Link>
          <Link className="navbar-item" to="https://twitter.com/stschiff"><FaTwitter /></Link>
          <Link className="navbar-item" to="https://github.com/stschiff"><FaGithub /></Link>
          <Link className="navbar-item" to="https://medium.com/stephan-schiffels"><FaMedium /></Link>
          <Link className="navbar-item" to="https://www.researchgate.net/profile/Stephan_Schiffels"><FaResearchgate /></Link>
          <Link className="navbar-item" rel="me" to="https://ecoevo.social/@stschiff"><FaMastodon /></Link>
        </div>
      </div>
    </div>
  </nav>
</header>
)

const Footer = () => (
  <footer class="footer has-text-centered">
    Powered by <Link to="https://www.gatsbyjs.org">Gatsby</Link> and <Link to="https://bulma.ui">bulma</Link>.
    Sourcecode available on <Link to="https://github.com/stschiff/homepage-gatsby">github</Link>.
  </footer>
)

const LayoutComponent = ({ activeNav, children, pageTitle }) => (
  <div class="container">
    <Header activeNav={activeNav}/>
    <div class="columns">
      <div class="column is-two-thirds">
        <main class="section">
          <h2>{pageTitle}</h2>
          <div class="content">{children}</div>
        </main>
      </div>
      <div class="column">
        <Sidebar />
      </div>
    </div>
    <Footer />
  </div>
)

export default LayoutComponent;
