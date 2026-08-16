import type { VoteGuideCategory } from '@/types/vote';
import Link from 'next/link';
import { SectionTitle } from '@/components/common/SectionTitle';
import { VOTE_GUIDE_MOCK_DATA } from './mock';
import VoteGuideBox from './VoteGuideBox';

interface VoteGuideContentProps {
  category: VoteGuideCategory;
}

export default function VoteGuideContent({ category }: VoteGuideContentProps) {
  const filteredGuides =
    category === 'all'
      ? VOTE_GUIDE_MOCK_DATA
      : VOTE_GUIDE_MOCK_DATA.filter((guide) => guide.category === category);

  return (
    <div className="flex flex-col gap-[24px] mt-[12px]">
      {filteredGuides.map((guide) => (
        <section key={guide.id}>
          <SectionTitle>{guide.title}</SectionTitle>

          <div className="flex flex-col gap-[12px]">
            {guide.content.map((content, index) => (
              content.href ? (
                <Link key={`${guide.id}-${index}`} href={content.href}>
                  <VoteGuideBox {...content} />
                </Link>
              ) : (
                <VoteGuideBox key={`${guide.id}-${index}`} {...content} />
              )
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
