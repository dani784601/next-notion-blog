import { matchTagAndColor } from '@/utils';
import TagBadge from '@/components/TagBadge';

type TagSearchType = {
  tagNames: string[];
}

export default function TagSearch({ tagNames }: TagSearchType) {
  return (
    <article
      className='w-full card'
    >
      <div className='card-body'>
        <section className='card-title'>
          태그 검색
        </section>
        <section className="flex gap-2">
          <TagBadge label={'전체'} color={'badge-neutral'}/>
        {
          tagNames.map((tagName) => <TagBadge key={tagName} label={tagName} color={matchTagAndColor(tagName)}/>)
        }
        </section>
      </div>
    </article>
  );
}
