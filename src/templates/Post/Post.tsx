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

const Post = ({ data: { markdownRemark: post, site }, location: { pathname }, ...rest }: PostProps) => {

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
      <Layout className='lg:w-5/6'>
        <PostTitle
          className='mb-4'
          title={post.frontmatter.title}
          date={parseISO(post.frontmatter.date)}
          readingTime={post.timeToRead}
          wordCount={post.wordCount.words}
          postUrl={postUrl}
        />
        <div
          className='post'
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
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