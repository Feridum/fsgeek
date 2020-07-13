import { PostList } from "../../models/post"

export type TagProps = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: PostList
      }[]
    }
  },
  pathContext: {
    nextPage?: string;
    previousPage?: string;
  }
}