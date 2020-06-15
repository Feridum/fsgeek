import React from "react"
import {Helmet} from "react-helmet";
import { graphql, useStaticQuery } from "gatsby"
import url from "url"
import { WebsiteMetaProps } from "./WebsiteMeta.types"

export const WebsiteMeta = ({ type } : WebsiteMetaProps) => {
  const settings = useStaticQuery(graphql`
    query WebsiteMeta {
      site {
        siteMetadata {
          title
          description
          twitter
          siteUrl
        }
      }
    }
  `)


  const config = settings.site.siteMetadata

  const publisherLogo = url.resolve(config.siteUrl, (settings.logo || config.siteIcon || ''))
  let shareImage = null;
  // let shareImage = image || data.feature_image
  //
  // shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null

  const description = config.description
  const title = config.title
  const canonical = url.resolve(config.siteUrl, location.pathname)

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    image: shareImage ?
      {
        "@type": `ImageObject`,
        url: shareImage,
        width: config.shareImageWidth,
        height: config.shareImageHeight,
      } : undefined,
    publisher: {
      "@type": `Organization`,
      name: settings.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
    description,
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
        {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
      </Helmet>
      {/*<ImageMeta image={shareImage} />*/}
    </>
  )
}
