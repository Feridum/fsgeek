import React from 'react'
import { MetaProps, MetaTypes } from "./Meta.types"
import { WebsiteMeta } from "./website/WebsiteMeta"
import { WebsiteMetaTypes } from "./website/WebsiteMeta.types"
import { PostMeta } from "./post/PostMeta"


export const Meta = ({type, url, postOptions}: MetaProps) => {

  if(type=== MetaTypes.PAGE){
    return <WebsiteMeta type={WebsiteMetaTypes.WEBSITE} siteUrl={url}/>
  }

  if(type=== MetaTypes.SERIES){
    return <WebsiteMeta type={WebsiteMetaTypes.SERIES} siteUrl={url}/>
  }

  if(type=== MetaTypes.ARTICLE){
    return <PostMeta siteUrl={url} {...postOptions} />
  }
}