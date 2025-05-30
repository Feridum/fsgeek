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
    <div
      className={
        'mb-8 rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-800'
      }
    >
      Interesujesz sie budowaniem aplikacji AI? Chcesz zostać AI Fullstack?
      Odwiedź{' '}
      <a
        href="https://aifullstack.pl/blog"
        target="_blank"
        className="font-extrabold underline hover:text-blue-600"
      >
        aifullstack.pl
      </a>{' '}
      i odkryj kompleksowe materiały, praktyczne poradniki oraz inspiracje,
      które krok po kroku wprowadzą Cię w świat tworzenia aplikacji AI.
    </div>

    <PostHeader content={props.frontmatter} author={AppConfig.author} />

    <PostContent content={props.frontmatter} headings={props.headings}>
      {props.children}
    </PostContent>
  </Section>
);

export { BlogPost };
