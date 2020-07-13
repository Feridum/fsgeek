import { Post, PostList } from "../../models/post"

export type MainListProps = {
  data: {
    posts: {
      edges:{
        node: PostList
      }[]
    }
  }
  pathContext: {
    nextPage?: string;
    previousPage?: string;
  }
}