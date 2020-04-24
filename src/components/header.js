import React from "react"
import { Link } from "gatsby"
import headerStyles from "./header.module.css"

const ListLink = props => (
    <Link to={props.to} activeClassName={headerStyles.menu_active}>{props.children}</Link>
)

export default () => (
  <header>
      <h1 className={headerStyles.titleHeader}>
        <Link to="/" className={headerStyles.headerLink}>Stephan Schiffels</Link>
      </h1>
      <h2 className={headerStyles.titleSubHeader}>Population Genetics – Computational Methods - Human History</h2>
      <nav className={headerStyles.mainMenu}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/research/">Research</ListLink>
        <ListLink to="/group/">Group</ListLink>
        <ListLink to="/publications/">Publications</ListLink>
        <ListLink to="/talks/">Talks</ListLink>
        <ListLink to="/resources/">Resources</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
        <ListLink to="/blog/">Blog</ListLink>
      </nav>
  </header>
)