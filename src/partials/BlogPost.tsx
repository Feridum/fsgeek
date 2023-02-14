import type { CollectionEntry } from 'astro:content';
import type { ReactNode } from 'react';

import { PostContent, PostHeader, Section } from '@/ui';
import { AppConfig } from '@/utils/AppConfig';

type IBlogPostProps = {
  frontmatter: CollectionEntry<'post'>['data'];
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />

    <PostContent content={props.frontmatter}>{props.children}</PostContent>
  </Section>
);

export { BlogPost };
