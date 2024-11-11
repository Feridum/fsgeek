import type { MarkdownHeading } from 'astro';
import type { CollectionEntry } from 'astro:content';
import type { ReactNode } from 'react';

import { PostContent, PostHeader, Section } from '@/ui';
import { AppConfig } from '@/utils/AppConfig';

type IBlogPostProps = {
  frontmatter: CollectionEntry<'post'>['data'];
  headings: MarkdownHeading[];
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />

    <PostContent content={props.frontmatter} headings={props.headings}>
      {props.children}
    </PostContent>
  </Section>
);

export { BlogPost };
