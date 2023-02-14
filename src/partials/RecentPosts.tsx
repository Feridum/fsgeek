import type { CollectionEntry } from 'astro:content';

import { BlogGallery, GradientText, Section } from '@/ui';

type IRecentPostsProps = {
  postList: CollectionEntry<'post'>[];
};

export const RecentPosts = (props: IRecentPostsProps) => (
  <Section
    title={
      <div className="flex items-baseline justify-between">
        <div>
          Ostatnie <GradientText>posty</GradientText>
        </div>

        <div className="text-sm">
          <a href="/post/1/">Zobacz wszystkie →</a>
        </div>
      </div>
    }
  >
    <BlogGallery postList={props.postList} />
  </Section>
);
