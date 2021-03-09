import React from "react"
import PropTypes from "prop-types"

export default function HTML(props: any) {
  
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link rel="alternate" type="application/rss+xml" title="FSGeek" href="https://fsgeek.pl/index.xml" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          className='pageContainer'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
      <script async={true} defer={true} crossOrigin="anonymous"
                src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v8.0&appId=846208848853284"/>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
