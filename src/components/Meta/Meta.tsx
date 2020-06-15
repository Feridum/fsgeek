import React from 'react'
import { MetaProps, MetaTypes } from "./Meta.types"
import { WebsiteMeta } from "./Website/WebsiteMeta"
import { WebsiteMetaTypes } from "./Website/WebsiteMeta.types"


export const Meta = ({type, postId}: MetaProps) => {

  if(type=== MetaTypes.PAGE){
    return <WebsiteMeta type={WebsiteMetaTypes.WEBSITE}/>
  }
}