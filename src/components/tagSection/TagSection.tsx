import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { TagSectionProps } from "./TagSection.types."
import "../../style/main.css"
import { Header } from "../header/Header"
import { PostCard } from "../postCard/PostCard"
import { RightIcon } from "../../icons/RightIcon"

export const TagSection = ({ posts,  tag }: TagSectionProps) => {

  const filteredPosts = posts.filter(post=>{
    const tags = post.node.fields.tagSlugs.map(postTag=>postTag.label);

    return tags.includes(tag)
  }).slice(0,3);

  return (
    <div className="mt-8">
      <div className="font-bold text-4xl mb-2">{`#${tag}`}</div>
      <div className='flex flex-col lg:flex-row items-center'>
        {filteredPosts.map(({ node: post }) => <PostCard post={post} key={post.id} className='mr-8'/>)}
        <RightIcon size={80} className={'sm:hidden'}/>
      </div>
    </div>
  )
}