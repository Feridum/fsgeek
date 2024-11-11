import { TableOfContentsHeading } from './TabletOfContentsHeading';

type TableOfContent = {
  depth: number;
  text: string;
  slug: string;
  subheadings?: TableOfContent[];
};

function buildToc(headings: TableOfContent[]) {
  const toc: TableOfContent[] = [];
  const parentHeadings = new Map();
  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    // Change 2 to 1 if your markdown includes your <h1>
    if (heading.depth === 1 || heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });
  return toc;
}

export const TableOfContents = ({
  headings,
}: {
  headings: TableOfContent[];
}) => {
  const toc = buildToc(headings);
  return (
    <nav className="max-w-xs dark:text-black">
      <p className="mb-3 text-2xl font-bold dark:text-white">Index</p>
      <ul className="flex flex-col gap-1 [text-wrap:balance]">
        {toc.map((heading) => (
          <TableOfContentsHeading heading={heading} key={heading.slug} />
        ))}
      </ul>
    </nav>
  );
};
