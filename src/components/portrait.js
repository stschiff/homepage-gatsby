import React from "react"
// import Img from "gatsby-image"
import portraitStyles from "./portrait.module.css"

export default ({name, image, children}) => (
  <div className={portraitStyles.portrait}>
      <img className={portraitStyles.portraitImg} src={image} alt={"Portrait of " + name} />
      <h3>{name}</h3>
      <ul className={portraitStyles.portraitContent}>
        {children}
      </ul>
  </div>
)
  