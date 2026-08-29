export type FollowAccountCategory = 'all' | 'official' | 'help' | 'report';

export type FollowAccount = {
  id: string;
  name: string;
  handle: string;
  url: string;
};

export type FollowAccountSection = {
  id: string;
  category: Exclude<FollowAccountCategory, 'all'>;
  title: string;
  accounts: FollowAccount[];
};

export const getXAccountIconSrc = (handle: string) =>
  `/images/xprofile/${handle.replace(/^@/, '').toLowerCase()}.png`;

export const FOLLOW_ACCOUNT_SECTIONS: FollowAccountSection[] = [
  {
    id: 'artist-official',
    category: 'official',
    title: '아티스트 공식 계정',
    accounts: [
      {
        id: 'g-dragon',
        name: 'G-DRAGON',
        handle: '@IBGDRGN',
        url: 'https://x.com/IBGDRGN',
      },
      {
        id: 'taeyang',
        name: 'TAEYANG',
        handle: '@Realtaeyang',
        url: 'https://x.com/Realtaeyang',
      },
      {
        id: 'daesung',
        name: 'DAESUNG',
        handle: '@d_lable',
        url: 'https://x.com/d_lable',
      },
    ],
  },
  {
    id: 'agency-content-official',
    category: 'official',
    title: '소속사/콘텐츠 공식 계정',
    accounts: [
      {
        id: 'cosmos-exhibition',
        name: 'COSMOS BIGBANG 20TH ANNIVERSARY MEDIA EXHIBITION',
        handle: '@cosmos_exh',
        url: 'https://x.com/cosmos_exh',
      },
      {
        id: 'bigbang-global-vip',
        name: 'BIGBANG GLOBAL VIP',
        handle: '@YG_GlobalVIP',
        url: 'https://x.com/YG_GlobalVIP',
      },
      {
        id: 'yg-family',
        name: 'YG FAMILY',
        handle: '@ygent_official',
        url: 'https://x.com/ygent_official',
      },
      {
        id: 'yg-select',
        name: 'YG SELECT',
        handle: '@ygselect',
        url: 'https://x.com/ygselect',
      },
      {
        id: 'fam',
        name: 'FAM',
        handle: '@FANPLUS1DOTCOM',
        url: 'https://x.com/FANPLUS1DOTCOM',
      },
      {
        id: 'g-a-boys-journey',
        name: "G: A BOY'S JOURNEY",
        handle: '@GDRAGONxFAM',
        url: 'https://x.com/GDRAGONxFAM',
      },
      {
        id: 'zo-and-friends',
        name: 'ZO&FRIENDS',
        handle: '@zonfriends',
        url: 'https://x.com/zonfriends',
      },
      {
        id: 'the-black-label',
        name: 'THEBLACKLABEL',
        handle: '@THEBLACKLABEL',
        url: 'https://x.com/THEBLACKLABEL',
      },
      {
        id: 'tbl-life',
        name: 'TBL life',
        handle: '@tbllifes',
        url: 'https://x.com/tbllifes',
      },
      {
        id: 'team-01',
        name: 'TEAM 01',
        handle: '@__TEAM01__',
        url: 'https://x.com/__TEAM01__',
      },
      {
        id: 'rnd-company',
        name: 'RND COMPANY',
        handle: '@RNDCOMPANY',
        url: 'https://x.com/RNDCOMPANY',
      },
      {
        id: 'dae-ssong',
        name: '댓쏭 | DaeSsong',
        handle: '@daessong_',
        url: 'https://x.com/daessong_',
      },
      {
        id: 'zip-daesung',
        name: '집대성',
        handle: '@zip_ds',
        url: 'https://x.com/zip_ds',
      },
    ],
  },
  {
    id: 'japan-official',
    category: 'official',
    title: '일본 공식 계정',
    accounts: [
      {
        id: 'bigbang-japan-official',
        name: 'BIGBANG JAPAN OFFICIAL',
        handle: '@bigbang_2xx6_JP',
        url: 'https://x.com/bigbang_2xx6_JP',
      },
      {
        id: 'd-lite-official-jp',
        name: 'D-LITE officialjp',
        handle: '@d_lite_official',
        url: 'https://x.com/d_lite_official',
      },
    ],
  },
  {
    id: 'fan-support',
    category: 'help',
    title: '덕질 도움 계정',
    accounts: [
      {
        id: 'vipwave',
        name: '빅뱅음원총공팀 VIPWAVE',
        handle: '@__VIPWAVE__',
        url: 'https://x.com/__VIPWAVE__',
      },
      {
        id: 'vote-in-peace',
        name: '빅뱅 투표총공팀',
        handle: '@_voteinpeace',
        url: 'https://x.com/_voteinpeace',
      },
      {
        id: 'gdragon-stream',
        name: '지드래곤 음원총공팀',
        handle: '@GDRAGON_STREAM',
        url: 'https://x.com/GDRAGON_STREAM',
      },
      {
        id: 'bigbang-music-chart',
        name: 'BIGBANG(빅뱅) MUSIC CHART',
        handle: '@BIGBANGMusic_',
        url: 'https://x.com/BIGBANGMusic_',
      },
      {
        id: 'bigbang-hashtag',
        name: '빅뱅 해시태그',
        handle: '@Bigbang_hashtag',
        url: 'https://x.com/Bigbang_hashtag',
      },
      {
        id: 'gdragon-hashtag',
        name: '지드래곤 해시태그',
        handle: '@hashforGD',
        url: 'https://x.com/hashforGD',
      },
      {
        id: 'bigbang-encore',
        name: '빅뱅 앵콜이벤트 BIGBANG Encore event',
        handle: '@bigbang_encore',
        url: 'https://x.com/bigbang_encore',
      },
      {
        id: 'bigbang-international-support',
        name: 'BIGBANG INTERNATIONAL SUPPORT',
        handle: '@BIGBANGintl',
        url: 'https://x.com/BIGBANGintl',
      },
      {
        id: 'gdragon-international',
        name: 'G-DRAGON INTERNATIONAL',
        handle: '@gdragonintl',
        url: 'https://x.com/gdragonintl',
      },
      {
        id: 'daesung-international',
        name: 'DAESUNG INTERNATIONAL',
        handle: '@DAESUNGintl',
        url: 'https://x.com/DAESUNGintl',
      },
    ],
  },
  {
    id: 'malicious-report',
    category: 'report',
    title: '악성 게시물 신고 계정',
    accounts: [
      {
        id: 'bigbang-protect',
        name: 'BIGBANG protect',
        handle: '@BIGBANG_protect',
        url: 'https://x.com/BIGBANG_protect',
      },
    ],
  },
];
