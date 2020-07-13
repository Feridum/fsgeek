import { Layout } from "../components/layout/Layout"
import { Meta } from "../components/Meta/Meta"
import { MetaTypes } from "../components/Meta/Meta.types"
import { graphql, Link } from "gatsby"
import React from "react"

type Tag = {
  tag: string,
  totalCount: number,
}
type BlogTags = {
  data: {
    allMarkdownRemark: {
      group: Tag[]
    }
  }
}

const sortTags = (a: Tag, b: Tag): number => {
  if (a.totalCount === b.totalCount)
    return 0
  return a.totalCount > b.totalCount ? -1 : 1
}

const BlogTags = ({ data }: BlogTags) => {
  const { group } = data.allMarkdownRemark

  const sortedTags = group.sort(sortTags)

  const max = sortedTags[0].totalCount
  const min = sortedTags[sortedTags.length - 1].totalCount

  return (
    <Layout>
      <Meta type={MetaTypes.PAGE} url={'/tags'}/>
      <div className="flex flex-wrap justify-center">
        {sortedTags.map((tag, index) => {
          const name = tag.tag.toLowerCase().split(" ").join('-').replace('?', '');;
          return (
            <Link to={`/tags/${name}`} key={index}>
              <div
              className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
              <div className="text-xs font-normal leading-none max-w-full flex-initial">{name}</div>
            </div>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogTags {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

export default BlogTags