import type { CollectionEntry } from 'astro:content';
import type { ReactNode } from 'react';

type IPostContentProps = {
  content: CollectionEntry<'post'>['data'];
  children: ReactNode;
};

const PostContent = (props: IPostContentProps) => (
  <div className="mx-auto mt-5 max-w-prose">
    <div className="aspect-w-3 aspect-h-2">
      <img
        className="h-full w-full rounded-lg object-cover object-center"
        src={props.content.image}
        alt={''}
        loading="lazy"
      />
    </div>

    <div className="prose prose-invert mt-8 prose-img:rounded-lg">
      {props.children}
    </div>
  </div>
);

export { PostContent };
