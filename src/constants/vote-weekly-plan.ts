import { type VoteWeeklySchedule } from '@/components/vote/VotePlan/VoteWeeklyScheduleCard';

const COMBINED_DESCRIPTION =
  '사전 투표와 생방송 투표 점수가 합산되어 차트에 반영됩니다.';
const PRE_VOTE_DESCRIPTION = '사전투표 점수가 합산되어 차트에 반영됩니다.';

export const VOTE_WEEKLY_SCHEDULES: VoteWeeklySchedule[] = [
  {
    id: 'the-show',
    title: '더 쇼',
    channel: 'SBS MTV',
    broadcastTime: '화요일 18:00',
    iconSrc: '/icon/vote/musicshow/theshow.svg',
    description: COMBINED_DESCRIPTION,
    summaries: [
      {
        label: '사전 투표',
        time: '매주 금요일 20:00 ~ 월요일 14:59',
        tone: 'advance',
      },
      { label: '생방송 투표', time: '매주 화요일 18:05 ~ 19:00', tone: 'live' },
    ],
    details: [
      {
        label: '사전 투표',
        time: '매주 금요일 20:00 ~ 월요일 14:59',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '빅크 BIGC' },
          {
            label: '투표 방법',
            value: '사전 투표 → 빅뱅 선택 → GEM 갯수 입력 → 투표',
          },
          { label: '필요 재화', value: '1표 = 20 ROYAL GEM / 400 FREE GEM' },
          { label: '가능 횟수', value: '무제한 투표' },
          {
            label: '유의 사항',
            value: '1회 투표 당 GEM 각각 최대 100만 개 사용 가능',
          },
        ],
      },
      {
        label: '생방송 투표',
        time: '매주 화요일 18:05 ~ 19:00',
        tone: 'live',
        rows: [
          { label: '투표 플랫폼', value: '빅크 BIGC' },
          {
            label: '투표 방법',
            value: '투표 → 빅뱅 선택 → GEM 갯수 입력 → 투표',
          },
          { label: '필요 재화', value: '1표 = 200 ROYAL GEM / 4000 FREE GEM' },
          { label: '유의 사항', value: '생방송 중에만 참여 가능' },
        ],
      },
    ],
    guides: [
      {
        id: 'bigc',
        title: '빅크 투표 가이드',
        iconSrc: '/icon/vote/bigc.svg',
        href: '/vote/guide/theshow#vote-guide-bigc',
      },
    ],
  },
  {
    id: 'show-champion',
    title: '쇼! 챔피언',
    channel: 'MBC Every1',
    broadcastTime: '수요일 18:00',
    iconSrc: '/icon/vote/musicshow/showchampion.svg',
    description: PRE_VOTE_DESCRIPTION,
    summaries: [
      {
        label: '사전 투표',
        time: '매주 금요일 20:00 ~ 월요일 14:59',
        tone: 'advance',
      },
    ],
    details: [
      {
        label: '사전 투표',
        time: '매주 금요일 20:00 ~ 월요일 14:59',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '아이돌챔프 앱' },
          { label: '투표 방법', value: '‘빅뱅’ 선택 → 투표권 교환 → 투표' },
          { label: '필요 재화', value: '1표 = 타임챔심 5개 / 루비챔심 1개' },
          { label: '가능 횟수', value: '무제한 투표' },
          { label: '유의 사항', value: '챔심 유효기간 확인' },
        ],
      },
    ],
    guides: [
      {
        id: 'idolchamp',
        title: '아이돌챔프 투표 가이드',
        iconSrc: '/icon/vote/voteplan/idolchamp.svg',
        href: '/vote/guide/showchampion#vote-guide-idolchamp',
      },
    ],
  },
  {
    id: 'm-countdown',
    title: '엠 카운트다운',
    channel: 'Mnet',
    broadcastTime: '목요일 18:00',
    iconSrc: '/icon/vote/musicshow/mcountdown.svg',
    description: COMBINED_DESCRIPTION,
    summaries: [
      {
        label: '사전 투표',
        time: '매주 토요일 00:00 ~ 화요일 23:59',
        tone: 'advance',
      },
      {
        label: '생방송 투표',
        time: '매주 목요일 18:00 ~ 생방송 투표 종료 전',
        tone: 'live',
      },
    ],
    details: [
      {
        label: '사전 투표',
        time: '매주 토요일 00:00 ~ 화요일 23:59',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '엠넷플러스' },
          {
            label: '투표 방법',
            value: '엠카운트다운 → 투표하기 → ‘빅뱅’ 선택 → 투표',
          },
          {
            label: '가능 횟수',
            value: '1일 5회 투표 (다수 기기 다계정 투표 가능)',
          },
          {
            label: '유의 사항',
            value: '동시에 진행되는 투표로 착오 없도록 더블 체크',
          },
        ],
      },
      {
        label: '생방송 투표',
        time: '매주 목요일 18:00 ~ 생방송 투표 종료 전',
        tone: 'live',
        rows: [
          { label: '투표 플랫폼', value: '엠넷플러스' },
          {
            label: '투표 방법',
            value: '엠카운트다운 → 투표하기 → ‘빅뱅’ 선택 → 투표',
          },
          {
            label: '가능 횟수',
            value: '1기기 당 1계정 투표 (다수 기기 다계정 투표 가능)',
          },
          {
            label: '유의 사항',
            value: '동시에 진행되는 투표로 착오 없도록 더블 체크',
          },
        ],
      },
    ],
    guides: [
      {
        id: 'mnetplus',
        title: '엠넷 플러스 투표 가이드',
        iconSrc: '/icon/vote/mnetplus.svg',
        href: '/vote/guide/mcountdown#vote-guide-mnetplus',
      },
    ],
  },
  {
    id: 'music-bank',
    title: '뮤직뱅크',
    channel: 'KBS',
    broadcastTime: '금요일 17:00',
    iconSrc: '/icon/vote/musicshow/musicbank.svg',
    description: PRE_VOTE_DESCRIPTION,
    summaries: [
      {
        label: '사전 투표',
        time: '매주 일요일 15:00 ~ 수요일 11:00',
        tone: 'advance',
      },
    ],
    details: [
      {
        label: '사전 투표',
        time: '매주 일요일 15:00 ~ 수요일 11:00',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '쿠궁' },
          {
            label: '투표 방법',
            value: '뮤직뱅크 배너 클릭 → ‘빅뱅’ 선택 → 투표',
          },
          { label: '필요 재화', value: '1표 = 골드하트 50개 / 블루하트 30개' },
          { label: '가능 횟수', value: '무제한 투표 (다계정 투표 가능)' },
          {
            label: '유의 사항',
            value: '동시에 진행되는 투표로 착오 없도록 더블 체크',
          },
        ],
      },
    ],
    guides: [
      {
        id: 'coogoong',
        title: '쿠궁 투표 가이드',
        iconSrc: '/icon/vote/coogoong.svg',
        href: '/vote/guide/musicbank#vote-guide-coogoong',
      },
    ],
  },
  {
    id: 'music-core',
    title: '쇼! 음악중심',
    channel: 'MBC',
    broadcastTime: '토요일 15:15',
    iconSrc: '/icon/vote/musicshow/musiccore.svg',
    description: COMBINED_DESCRIPTION,
    summaries: [
      {
        label: '사전 투표 1',
        time: '매주 화요일 18:00 ~ 목요일 11:00',
        tone: 'advance',
      },
      {
        label: '사전 투표 2',
        time: '매주 토요일 00:00 ~ 화요일 23:59',
        tone: 'advance',
      },
      {
        label: '사전 투표 3',
        time: '매주 토요일 00:00 ~ 화요일 23:59',
        tone: 'advance',
      },
      {
        label: '생방송 투표 1',
        time: '매주 토요일 15:20 ~ 16:10',
        tone: 'live',
      },
      {
        label: '생방송 투표 2',
        time: '매주 토요일 18:00 ~ 생방송 투표 종료 전',
        tone: 'live',
      },
      { label: '문자 투표', time: '매주 토요일 15:30 ~ 16:20', tone: 'text' },
      {
        label: 'M PICK 투표',
        time: '매주 토요일 17:00 ~ 목요일 10:59',
        tone: 'special',
      },
    ],
    details: [
      {
        label: '사전 투표 1 (글로벌 사전투표)',
        time: '매주 화요일 18:00 ~ 목요일 11:00',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '뮤니버스' },
          { label: '투표 방법', value: '글로벌 사전투표 → ‘빅뱅’ 선택 → 투표' },
          { label: '필요 재화', value: '1표 = 5 애드루미' },
          { label: '가능 횟수', value: '무제한 투표 (다계정 투표 가능)' },
          {
            label: '유의 사항',
            value: '동시에 진행되는 투표로 착오 없도록 더블 체크',
          },
        ],
      },
      {
        label: '사전 투표 2 (글로벌 사전투표)',
        time: '매주 화요일 18:00 ~ 목요일 11:00',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '뮤빗' },
          { label: '투표 방법', value: '글로벌 사전투표 → ‘빅뱅’ 선택 → 투표' },
          { label: '필요 재화', value: '1표 = 하트비트 3개' },
          { label: '가능 횟수', value: '무제한 투표 (다계정 투표 가능)' },
        ],
      },
      {
        label: '사전 투표 3 (시청자 위원회)',
        time: '매주 수요일 09:00 ~ 목요일 11:00',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: 'MBC 쇼음악중심 공식 홈페이지' },
          {
            label: '투표 방법',
            value: '시청자 위원회 투표 → ‘빅뱅’ 선택 → 투표',
          },
          { label: '가능 횟수', value: '매주 1회' },
          { label: '유의 사항', value: '시청자위원회 당첨자 한해 투표 가능' },
        ],
      },
      {
        label: '생방송 투표 1',
        time: '매주 토요일 15:20 ~ 16:10',
        tone: 'live',
        rows: [
          { label: '투표 플랫폼', value: '뮤니버스' },
          { label: '투표 방법', value: 'STAGE M PICK → ‘빅뱅’ 선택 → 투표' },
          { label: '필요 재화', value: '1표 = 50 프리루미 / 60 골드루미' },
          { label: '가능 횟수', value: '1계정당 최대 5표 (다계정 투표 가능)' },
        ],
      },
      {
        label: '생방송 투표 2',
        time: '매주 토요일 15:20 ~ 생방송 투표 종료 전',
        tone: 'live',
        rows: [
          { label: '투표 플랫폼', value: '뮤빗' },
          { label: '투표 방법', value: 'STAGE M PICK → ‘빅뱅’ 선택 → 투표' },
          { label: '필요 재화', value: '5표 = 하트비트 150개' },
          { label: '가능 횟수', value: '1계정당 최대 5표 (다계정 투표 가능)' },
        ],
      },
      {
        label: '문자 투표',
        time: '매주 토요일 15:30 ~ 16:20',
        tone: 'text',
        rows: [
          { label: '투표 플랫폼', value: '문자' },
          {
            label: '투표 방법',
            value: '#0505로 해당 고유번호 혹은 ‘빅뱅’ 전송',
          },
          { label: '가능 횟수', value: '1인 1회 (유료 100원)' },
          { label: '유의 사항', value: '투표 안내 후 참여 가능' },
        ],
      },
      {
        label: 'STAGE M PICK 투표',
        time: '매주 토요일 17:00 ~ 목요일 10:59',
        tone: 'special',
        rows: [
          { label: '투표 플랫폼', value: '뮤니버스' },
          { label: '투표 방법', value: 'STAGE M PICK → ‘빅뱅’ 선택 → 투표' },
          { label: '필요 재화', value: '1표 = 10 프리루미 / 골드루미' },
          {
            label: '가능 횟수',
            value: '프리루미 - 1일 최대 10표 / 골드루미 무제한 투표',
          },
          { label: '유의 사항', value: '방송 종료 후 진행 / 100% 팬 투표' },
        ],
      },
    ],
    guides: [
      {
        id: 'muniverse',
        title: '뮤니버스 투표 가이드',
        iconSrc: '/icon/vote/voteplan/muniverse.svg',
        href: '/vote/guide/musiccore#vote-guide-muniverse',
      },
      {
        id: 'mubeat',
        title: '뮤빗 투표 가이드',
        iconSrc: '/icon/vote/voteplan/mubeat.svg',
        href: '/vote/guide/musiccore#vote-guide-mubeat',
      },
    ],
  },
  {
    id: 'inkigayo',
    title: '인기가요',
    channel: 'SBS',
    broadcastTime: '일요일 15:20',
    iconSrc: '/icon/vote/musicshow/inga.svg',
    description: COMBINED_DESCRIPTION,
    summaries: [
      {
        label: '사전 투표',
        time: '매주 월요일 12:00 ~ 금요일 23:59',
        tone: 'advance',
      },
      {
        label: '생방송 투표',
        time: '매주 일요일 15:20 ~ 생방송 투표 종료 전',
        tone: 'live',
      },
      {
        label: '핫스테이지',
        time: '매주 일요일 생방송 종료 후 ~ 차주 목요일 12:00',
        tone: 'special',
      },
    ],
    details: [
      {
        label: '사전 투표',
        time: '매주 월요일 12:00 ~ 금요일 23:59',
        tone: 'advance',
        rows: [
          { label: '투표 플랫폼', value: '링크' },
          {
            label: '투표 방법',
            value: '인기가요 사전 투표 → ‘빅뱅’ 선택 → 투표',
          },
          { label: '필요 재화', value: '1표 = 30 팬 포인트 / 8 젬' },
          {
            label: '가능 횟수',
            value: '계정 당 매일 10회 투표 (다계정 투표 가능)',
          },
          {
            label: '유의 사항',
            value: '신곡은 매주 2회 (월,수요일 6시) 추가 반영',
          },
        ],
      },
      {
        label: '생방송 투표',
        time: '매주 일요일 15:20 ~ 생방송 투표 종료 전',
        tone: 'live',
        rows: [
          { label: '투표 플랫폼', value: '하이어' },
          {
            label: '투표 방법',
            value: '인기가요 실시간 투표 → ‘빅뱅’ 선택 → 투표',
          },
          { label: '필요 재화', value: '5표 = 루비 250개 / 다이아 25개' },
          { label: '가능 횟수', value: '계정 당 최대 5회' },
          {
            label: '유의 사항',
            value: '유료 결제 시 다이아 30개 충전 후 5표 사용 추천',
          },
        ],
      },
      {
        label: '핫스테이지 투표',
        time: '매주 일요일 생방송 종료 후 ~ 차주 목요일 12:00',
        tone: 'special',
        rows: [
          { label: '투표 플랫폼', value: '하이어' },
          {
            label: '투표 방법',
            value: '인기가요 핫스테이지 → ‘빅뱅’ 선택 → 투표',
          },
          { label: '필요 재화', value: '10표 = 루비 300개 / 다이아 30개' },
          { label: '가능 횟수', value: '계정 당 매일 10회 투표' },
        ],
      },
    ],
    guides: [
      {
        id: 'linc',
        title: '링크 투표 가이드',
        iconSrc: '/icon/vote/voteplan/linc.svg',
        href: '/vote/guide/inkigayo#vote-guide-linc',
      },
      {
        id: 'higher',
        title: '하이어 투표 가이드',
        iconSrc: '/icon/vote/voteplan/higher.svg',
        href: '/vote/guide/inkigayo#vote-guide-higher',
      },
    ],
  },
];
