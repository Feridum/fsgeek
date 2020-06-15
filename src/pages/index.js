import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../components/Layout/Layout"
import { PostCard } from "../components/PostCard/PostCard"
import { Meta } from "../components/Meta/Meta"
import { MetaTypes } from "../components/Meta/Meta.types"
import { RightIcon } from "../icons/RightIcon"


const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <Meta type={MetaTypes.PAGE}/>
      <div className='flex flex-col lg:flex-row'>
        {posts.map(({ node: post }) => <PostCard post={post} key={post.id} className='mr-8'/>)}
        <RightIcon size={80}/>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogIndex {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          fields {
            tagSlugs {
              label
              value
            }
          }
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

export default BlogIndex