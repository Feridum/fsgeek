import { cn } from '@/utils';

type Heading = {
  depth: number;
  text: string;
  slug: string;
  subheadings?: Heading[];
};

export interface Props {
  heading: Heading;
}

export const TableOfContentsHeading = ({ heading }: Props) => {
  return (
    <li className="flex flex-col">
      <a
        href={`#${heading.slug}`}
        className={cn(
          `bg-slate-200 dark:bg-slate-800 dark:hover:bg-[#02b0b6] hover:bg-[#02b0b6] hover:text-white  
          py-1 px-3.5 dark:text-white rounded-xl mb-2 first-letter:uppercase w-fit line-clamp-2`
        )}
      >
        {heading.text}
      </a>
      {heading.subheadings &&
      heading.subheadings.length &&
      heading.subheadings?.length > 0 ? (
        <ul className="ml-3">
          {heading.subheadings?.map((subheading) => (
            <TableOfContentsHeading
              heading={subheading}
              key={subheading.slug}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};
