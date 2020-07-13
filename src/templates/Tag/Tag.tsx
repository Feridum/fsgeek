import React from "react"
import { Layout } from "../../components/layout/Layout"
import { graphql } from "gatsby"
import { TagProps } from "./Tag.types"

import { PostCard } from "../../components/postCard/PostCard"
import { PageNavigation } from "../../components/pageNavigation/PageNavigation"

const Tag = ({ data, pathContext:{nextPage, previousPage} }: TagProps) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <div className='flex flex-col lg:flex-row items-center flex-wrap'>
        {posts.map(({ node: post }) => <PostCard post={post} key={post.id} className='mr-8 my-4'/>)}
      </div>
      <PageNavigation nextPage={nextPage} previousPage={previousPage}/>
    </Layout>
  )
}

export default Tag

export const postQuery = graphql`
  query BlogTagsQuery($tag: String, $skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    filter: {fields: {tagSlugs: {elemMatch: {label: {eq: $tag}}}}}
    limit: $limit
    skip: $skip
    sort: {order: DESC, fields: frontmatter___date}
  ) {
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
          image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`