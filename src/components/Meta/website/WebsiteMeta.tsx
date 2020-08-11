import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import url from "url"
import { WebsiteMetaProps } from "./WebsiteMeta.types"

export const WebsiteMeta = ({ siteUrl, type }: WebsiteMetaProps) => {
  const settings = useStaticQuery(graphql`
    query WebsiteMeta {
      site {
        siteMetadata {
          title
          description
          twitter
          siteUrl
          logoUrl
          language
          fbAppId
        }
      }
    }
  `)


  const config = settings.site.siteMetadata

  const publisherLogo = url.resolve(config.siteUrl, (config.logoUrl || ""))
  let shareImage = publisherLogo

  const description = config.description
  const title = config.title
  const canonical = url.resolve(config.siteUrl, siteUrl)

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    logo: publisherLogo,
    image: shareImage ?
      {
        "@type": `ImageObject`,
        url: shareImage
      } : undefined,
    publisher: {
      "@type": `Organization`,
      name: settings.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60
      }
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl
    },
    description
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: config.language || "auto" }}>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <link rel="canonical" href={canonical}/>

        <meta property="og:site_name" content={config.siteTitle}/>
        <meta property="og:type" content="website"/>
        <meta
          property="og:title"
          content={
            title
          }
        />
        <meta
          property="og:description"
          content={
            description
          }
        />
        <meta property="og:url" content={canonical}/>
        <meta
          property="og:image"
          content={shareImage}
        />
        {config.fbAppId !== "" && (
          <meta property="fb:app_id" content={config.fbAppId} />
        )}
        <meta
          name="twitter:title"
          content={
            title
          }
        />
        <meta
          name="twitter:description"
          content={
            description
          }
        />
        <meta name="twitter:url" content={canonical}/>
        {config.twitter && (
          <meta name="twitter:site" content={config.twitter}/>
        )}
        {config.twitter && (
          <meta name="twitter:creator" content={config.twitter}/>
        )}
        <meta
          name="twitter:image"
          content={shareImage}
        />
        <meta name="twitter:card" content="summary_large_image"/>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
    </>
  )
}
