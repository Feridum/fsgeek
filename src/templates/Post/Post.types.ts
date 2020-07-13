import { Post } from "../../models/post"

export type PostProps = {
  data: {
    markdownRemark: Post
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
  },
  location: {
    pathname: string,
    origin: string,
  }
}