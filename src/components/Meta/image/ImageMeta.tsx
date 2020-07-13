import React from "react"
import { Helmet } from "react-helmet"

type ImageMetaProps = {
  image: string;
}

export const ImageMeta = ({ image }: ImageMetaProps) => {
  if (!image) {
    return null
  }

  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:image" content={image}/>
      <meta property="og:image" content={image}/>
    </Helmet>
  )
}