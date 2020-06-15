import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { graphql } from "gatsby"
import { PostProps } from "./Post.types"

import './Post.styles.css'
import { PostTitle } from "../../components/PostTitle/PostTitle"

const Post = ({ data: { markdownRemark: post } }: PostProps) => {
  return (
    <Layout>
      <div className="w-4/5 mx-auto">
        <PostTitle
          className='mb-4'
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          readingTime={post.timeToRead}
          wordCount={post.wordCount.words}
        />
        <div
          className='post'
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
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
      }
      timeToRead
      wordCount {
        words
      }
    }
  }
`