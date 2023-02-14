import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

type Props = {
  instance: CollectionEntry<'post'>;
};

const BlogCard = (props: Props) => {
  return (
    <a className="hover:translate-y-1" href={`/post/${props.instance.slug}/`}>
      <div className="h-full overflow-hidden rounded-md bg-[#003739]">
        <div className="aspect-w-3 aspect-h-2">
          <img
            className="h-full w-full object-cover object-center"
            src={props.instance.data.image}
            alt={''}
            loading="lazy"
          />
        </div>

        <div className="px-3 pt-4 pb-6 text-center">
          <h2 className="text-xl font-semibold">{props.instance.data.title}</h2>

          <div className="mt-1 text-xs text-gray-400">
            {format(props.instance.data.date, 'LLL d, yyyy')}
          </div>

          <div className="mt-2 text-sm">{props.instance.data.description}</div>
        </div>
      </div>
    </a>
  );
};

export { BlogCard };
