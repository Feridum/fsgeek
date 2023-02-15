import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

type IPostHeaderProps = {
  content: CollectionEntry<'post'>['data'];
  author: string;
};

const PostHeader = (props: IPostHeaderProps) => (
  <>
    <h1 className="text-center text-3xl font-bold">{props.content.title}</h1>

    <div className="mt-2 text-center text-sm text-gray-400">
      By {props.author} on {format(props.content.date, 'LLL d, yyyy')}
    </div>
  </>
);

export { PostHeader };
