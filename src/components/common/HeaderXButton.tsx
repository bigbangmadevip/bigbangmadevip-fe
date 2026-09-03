import Image from 'next/image';
import Link from 'next/link';

type ManageTeam = 'music' | 'vote';

const MANAGE_TEAM_KO: Record<ManageTeam, string> = {
  music: '음총',
  vote: '투총',
};

interface HeaderXButtonProps {
  href: string;
  teamNm: ManageTeam;
}

const HeaderXButton = ({ href, teamNm }: HeaderXButtonProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-[4px] p-[4px] pr-[8px] border border-secondary-800 bg-secondary-900 rounded-full"
    >
      <Image
        src={'/images/xprofile/x_logo.png'}
        alt="XLOGO"
        width={24}
        height={18}
      />
      <p className="text-body-12 text-secondary-300">
        {MANAGE_TEAM_KO[teamNm]}팀
      </p>
    </Link>
  );
};

export default HeaderXButton;
