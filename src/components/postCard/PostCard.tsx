import { PostCardProps } from "./PostCard.types"
import { Link } from "gatsby"
import React from "react"
import clsx from "clsx"
import { GatsbyImage } from "gatsby-plugin-image"

export const PostCard = ({ post, className }: PostCardProps) => {

  const url = post.frontmatter.url ? post.frontmatter.url : `/post/${post.frontmatter.slug}/`;

  return (
    <div className={clsx(className, "w-full lg:w-auto mt-4 lg:mt-0 h-auto self-stretch")}>
      <div className="lg:max-w-sm rounded-lg overflow-hidden shadow-lg flex-col flex h-full">
        <Link to={url}
              className="lg:max-w-sm overflow-hidden flex-row lg:flex-col flex h-full z-10">
          {post.frontmatter.image?.childImageSharp?.gatsbyImageData && <GatsbyImage image={post.frontmatter.image.childImageSharp.gatsbyImageData}
                                          className="hidden sm:flex flex-shrink-0 w-1/4 lg:w-auto pointer-events-none"
                                          loading="eager" alt=""/>}

          <div className="px-6 py-4 flex flex-initial flex-col">
            <div className="font-bold text-xl mb-2">{post.frontmatter.title}</div>
            <p className="text-gray-700 text-base">
              {post.excerpt}
            </p>
          </div>
        </Link>
        <div className="px-6 py-4">
          {post.fields.tagSlugs && post.fields.tagSlugs.map(tag => {
            return (
              <Link to={tag.value} key={tag.value}>
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-1">#{tag.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}