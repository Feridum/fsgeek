export type MetaProps = {
  type: MetaTypes, 
  postId?: string
}

export enum MetaTypes {
  ARTICLE = 'article',
  PAGE = 'page'
}