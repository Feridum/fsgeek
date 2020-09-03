import React from "react"
import { Layout } from "../../components/layout/Layout"
import { graphql, Link } from "gatsby"
import { PostProps } from "./Post.types"
// @ts-ignore
import { Disqus } from "gatsby-plugin-disqus"

import "./Post.styles.css"
import { PostTitle } from "../../components/postTitle/PostTitle"
import url from "url"
import { Meta } from "../../components/Meta/Meta"
import { MetaTypes } from "../../components/Meta/Meta.types"
import { parseISO } from "date-fns"
import { Helmet } from "react-helmet"

const Post = ({ data: { markdownRemark: post, site }, location: { pathname } }: PostProps) => {

  const postUrl = url.resolve(site.siteMetadata.siteUrl, pathname)
  const disqusConfig = {
    url: postUrl,
    identifier: post.id,
    title: post.frontmatter.title
  }

  return (
    <>
      <Meta type={MetaTypes.ARTICLE} url={pathname}
            postOptions={{
              title: post.frontmatter.title,
              tags: post.fields.tagSlugs.map(t => t.label),
              imageUrl: post.frontmatter.image?.publicURL,
              description: post.excerpt,
              publishedAt: post.frontmatter.date
            }}/>
      <Helmet>
        <script async={true} defer={true} crossOrigin="anonymous" src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v8.0&appId=846208848853284" />
      </Helmet>
      <div id="fb-root"/>
      <Layout className='lg:w-full'>
        <PostTitle
          className='mb-4'
          title={post.frontmatter.title}
          date={parseISO(post.frontmatter.date)}
          readingTime={post.timeToRead}
          wordCount={post.wordCount.words}
          postUrl={postUrl}
        />
        <div className='w-full flex flex-col lg:flex-row justify-between'>
          <div
            className='post w-full lg:w-3/4'
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className="fb-page w-full lg:w-1/5" data-href="https://www.facebook.com/fsgeekk/" data-tabs="" data-width=""
               data-height=""
               data-small-header="false" data-adapt-container-width="true" data-hide-cover="false"
               data-show-facepile="true">
            <blockquote cite="https://www.facebook.com/fsgeekk/" className="fb-xfbml-parse-ignore"><a
              href="https://www.facebook.com/fsgeekk/" rel="noreferrer">Full Stack Geek</a></blockquote>
          </div>
        </div>
        <div className="py-4">
          {post.fields.tagSlugs && post.fields.tagSlugs.map(tag => {
            return (
              <Link to={tag.value} key={tag.value}>
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-1">#{tag.label}</span>
              </Link>
            )
          })}
        </div>
        <Disqus config={disqusConfig}/>
      </Layout>
    </>
  )
}

export default Post

export const postQuery = graphql`
  query BlogPostQuery($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        slug
        title
        date
        image {
          publicURL
        }
      }
      timeToRead
      wordCount {
        words
      }
      fields {
        tagSlugs {
          label
          value
        }
      }
      excerpt
    }
    site {
        siteMetadata {
          siteUrl
        }
      }
  }
`