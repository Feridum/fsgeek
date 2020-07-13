import { PostMetaProps } from "./post/PostMeta.types"

export type MetaProps = {
  type: MetaTypes,
  url: string
  postOptions?: Omit<PostMetaProps, 'siteUrl'>
}

export enum MetaTypes {
  ARTICLE = 'article',
  PAGE = 'page',
  SERIES = 'series',
}