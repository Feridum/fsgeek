import type { MarkdownHeading } from 'astro';
import type { CollectionEntry } from 'astro:content';
import type { ReactNode } from 'react';

import { TableOfContents } from './TableOfContents';

type IPostContentProps = {
  content: CollectionEntry<'post'>['data'];
  headings: MarkdownHeading[];
  children: ReactNode;
};

const PostContent = (props: IPostContentProps) => (
  <div className="mt-8 grid max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-[20%_auto]">
    <aside className="hidden flex-col gap-8 md:flex">
      <div className="sticky top-24 hidden self-start transition-all duration-200 md:block">
        {props.headings && props.headings.length > 0 && (
          <TableOfContents headings={props.headings} />
        )}
      </div>
    </aside>

    <article className="w-full max-w-full">
      <div className="prose prose-invert min-w-full prose-img:rounded-lg">
        {props.children}
      </div>
    </article>
  </div>
);

export { PostContent };
