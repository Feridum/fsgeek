import { PostCardProps } from "./PostCard.types"
import { Link } from "gatsby"
import React from "react"


export const PostCard = ({ post, className }: PostCardProps) => {

  return (
    <Link to={`post/${post.frontmatter.slug}`} className={className}>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
        <img className="w-full" src="" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.frontmatter.title}</div>
          <p className="text-gray-700 text-base">
            {post.excerpt}
          </p>
        </div>
        <div className="px-6 py-4">
          {post.fields.tagSlugs.map(tag => {
            return (
              <Link to={tag.value}>
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </Link>
  )
}