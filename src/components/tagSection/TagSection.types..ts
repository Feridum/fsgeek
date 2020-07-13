import { PostList } from "../../models/post"

export type TagSectionProps = {
  posts: {node: PostList}[];
  tag: string;
}