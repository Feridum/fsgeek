import { Post } from "../../models/post"

export type PostProps = {
  data: {
    markdownRemark: Post
  }
}