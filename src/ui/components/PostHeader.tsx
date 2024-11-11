import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

type IPostHeaderProps = {
  content: CollectionEntry<'post'>['data'];
  author: string;
};

const PostHeader = (props: IPostHeaderProps) => (
  <div className="mx-auto mt-5 max-w-screen-lg">
    <h1 className="text-center text-3xl font-bold">{props.content.title}</h1>

    <div className="mt-2 text-center text-sm text-gray-400">
      Napisał {props.author} on {format(props.content.date, 'LLL d, yyyy')}
    </div>

    <div className="aspect-w-3 aspect-h-1 m-auto mt-2 max-w-prose">
      <img
        className="h-full w-full rounded-lg object-cover object-bottom"
        src={props.content.image}
        alt={''}
        loading="lazy"
      />
    </div>
  </div>
);

export { PostHeader };
