import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../../components/layout/Layout"
import { PostCard } from "../../components/postCard/PostCard"
import { Meta } from "../../components/Meta/Meta"
import { MetaTypes } from "../../components/Meta/Meta.types"
import { MainListProps } from "./MainList.types"
import { LeftIcon, RightIcon } from "../../icons"
import { PageNavigation } from "../../components/pageNavigation/PageNavigation"


const MainList = ({ data, pageContext: { previousPage, nextPage },  }: MainListProps) => {
  const { edges: posts } = data.posts

  return (
    <Layout>
      <Meta type={MetaTypes.PAGE} url={'/'}/>
      <div className='flex flex-col lg:flex-row items-center flex-wrap mx-auto justify-center'>
        {posts.map(({ node: post }) => <PostCard post={post} key={post.id} className='mr-8 mb-12'/>)}
      </div>
      <PageNavigation nextPage={nextPage} previousPage={previousPage}/>
    </Layout>
  )
}

export const pageQuery = graphql`
  query mainList($skip: Int!, $limit: Int!) {
  posts: allMarkdownRemark(
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
          url
          image {
              childImageSharp {
                gatsbyImageData(width: 400, layout: CONSTRAINED, quality: 100)
              }
            }
        }
      }
    }
  }
}

`

export default MainList