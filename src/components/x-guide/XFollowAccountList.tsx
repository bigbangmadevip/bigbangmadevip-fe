import Image from 'next/image';
import {
  FOLLOW_ACCOUNT_SECTIONS,
  getXAccountIconSrc,
  type FollowAccountCategory,
} from '@/constants/x-guide';

type XFollowAccountListProps = {
  category: FollowAccountCategory;
};

export default function XFollowAccountList({
  category,
}: XFollowAccountListProps) {
  const sections =
    category === 'all'
      ? FOLLOW_ACCOUNT_SECTIONS
      : FOLLOW_ACCOUNT_SECTIONS.filter(
          (section) => section.category === category,
        );

  return (
    <div
      id={`x-follow-category-panel-${category}`}
      role="tabpanel"
      aria-labelledby={`x-follow-category-tab-${category}`}
      className="mt-[12px]"
    >
      {sections.length > 0 ? (
        <div className="flex flex-col gap-[32px]">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-title-17 font-bold text-secondary-1">
                {section.title}
              </h2>

              <div className="mt-[16px] flex flex-col gap-[8px]">
                {section.accounts.map((account) => (
                  <a
                    key={account.id}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${account.name} X 계정 열기`}
                    className="flex w-full items-center rounded-[16px] bg-secondary-900 p-[16px] pr-[12px] text-left"
                  >
                    <Image
                      src={getXAccountIconSrc(account.handle)}
                      alt={`${account.name} 프로필`}
                      width={40}
                      height={40}
                      className="h-[40px] w-[40px] shrink-0 rounded-full object-cover"
                    />

                    <span className="ml-[12px] min-w-0 flex-1">
                      <strong className="line-clamp-2 text-body-15 font-bold text-secondary-1">
                        {account.name}
                      </strong>
                      <span className="mt-[2px] block truncate text-body-13 text-secondary-400">
                        {account.handle}
                      </span>
                    </span>

                    <Image
                      src="/icon/line/arrow-right_gray-24.svg"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                      className="ml-[12px] shrink-0"
                    />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center text-body-13 text-secondary-500">
          등록된 계정이 없어요.
        </div>
      )}
    </div>
  );
}
