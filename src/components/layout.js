import React from "react"
import Header from "./header"
import Footer from "./footer"
import "./layout.module.css"

export default ({ children, pageTitle }) => (
  <div>
    <Header />
    <main>
      <h1>{pageTitle}</h1>
      {children}
    </main>
    <Footer />
  </div>
)