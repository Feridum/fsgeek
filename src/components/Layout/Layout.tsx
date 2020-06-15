import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { LayoutProps } from "./Layout.types."
import "../../style/main.css"
import { Header } from "../Header/Header"

export const Layout = ({ children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="">
      <Header/>
      <main className='pt-32 pl-10'>{children}</main>
      <footer>
      </footer>
    </div>
  )
}