import React from "react"
import { Helmet } from "react-helmet"
import { ImageMeta } from "../image/ImageMeta"
import { PostMetaProps } from "./PostMeta.types"
import { graphql, useStaticQuery } from "gatsby"
import url from "url"


export const PostMeta = ({ title, description, imageUrl, siteUrl, tags, publishedAt }: PostMetaProps) => {
  const settings = useStaticQuery(graphql`
    query PostMeta {
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
  const canonical = url.resolve(config.siteUrl, siteUrl)
  const publisherLogo = url.resolve(config.siteUrl, (config.logoUrl || ''))
  const shareImage = url.resolve(config.siteUrl, (imageUrl || config.logoUrl || ''))


  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": `Article`,
    keywords: tags.length ? tags.join(`, `) : undefined,
    headline: title,
    url: canonical,
    datePublished: publishedAt,
    image: shareImage
      ? {
        "@type": `ImageObject`,
        url: shareImage,
        width: config.shareImageWidth,
        height: config.shareImageHeight,
      }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: config.siteTitle,
      logo: publisherLogo
        ? {
          "@type": `ImageObject`,
          url: publisherLogo,
          width: 60,
          height: 60,
        }
        : undefined,
    },
    description: description,
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: config.language || "auto" }}>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta property="og:site_name" content={config.title}/>
        <meta property="og:type" content="article"/>
        <meta
          property="og:title"
          content={title}
        />
        <meta
          property="og:description"
          content={description}
        />
        <meta property="og:url" content={canonical}/>
        <meta
          property="article:published_time"
          content={publishedAt}
        />
        {config.fbAppId !== "" && (
          <meta property="fb:app_id" content={config.fbAppId} />
        )}
        {tags.map((keyword, i) => (
          <meta property="article:tag" content={keyword} key={i}/>
        ))}
        <meta
          name="twitter:title"
          content={title}
        />
        <meta
          name="twitter:description"
          content={description}
        />
        <meta name="twitter:url" content={canonical}/>
        {config.twitter && (
          <meta name="twitter:site" content={config.twitter}/>
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
      <ImageMeta image={shareImage}/>
    </>
  )
}