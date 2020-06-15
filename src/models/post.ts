export type PostList = {
  id: string;
  excerpt: string,
  frontmatter: {
    slug: string,
    title: string,
  }
  fields:{
    tagSlugs: {label: string, value: string}[]
  }
}

export type Post = {
  id: string;
  html: string,
  frontmatter: {
    slug: string,
    title: string
    date: string
  }
  timeToRead: number,
  wordCount: {
    words: number
  }
}