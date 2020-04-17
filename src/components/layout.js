import React from "react"
import Header from "./header"
import Footer from "./footer"
import "./layout.module.css"

export default ({ children }) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
)