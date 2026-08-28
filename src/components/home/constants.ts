import { withObjectParticle } from '@/lib/korean';
import { CHEERING_CATEGORY, CheeringItem, UrgentDetail } from '@/types/home';

export type CheeringDialogContext = {
  item: CheeringItem;
  typeCompletedCount: number;
  completedCount?: number;
};

type DialogStepConfig = {
  title: string;
  description: (context: CheeringDialogContext) => string;
  buttonLabel: string;
};

type CheeringDialogConfig = {
  confirm: DialogStepConfig;
  complete: DialogStepConfig;
};

export const CHEERING_DIALOG_CONFIG = {
  STREAMING: {
    confirm: {
      title: '오늘 스트리밍을 완료했나요?',
      description: ({ item }) => {
        const target = item.subtitle ?? item.title;

        return `${withObjectParticle(target)} 듣고 왔다면\n참여완료를 눌러주세요.`;
      },
      buttonLabel: '참여완료',
    },
    complete: {
      title: '오늘의 스트리밍 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n스트리밍을 함께 했어요.`,
      buttonLabel: '확인',
    },
  },

  DOWNLOAD: {
    confirm: {
      title: '오늘 다운로드를 완료했나요?',
      description: () => '음원 다운로드를 완료했다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '음원 다운로드 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n다운로드를 함께 했어요.`,
      buttonLabel: '확인',
    },
  },

  PREVOTE: {
    confirm: {
      title: '투표를 완료했나요?',
      description: () => '투표를 마쳤다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '오늘의 투표 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n투표를 함께했어요.`,
      buttonLabel: '확인',
    },
  },

  YOUTUBEMV: {
    confirm: {
      title: '오늘 뮤직비디오 조회를 완료했나요?',
      description: ({ item }) => {
        const target = item.subtitle ?? item.title;

        return `${withObjectParticle(target)} 보고 왔다면\n참여완료를 눌러주세요.`;
      },
      buttonLabel: '참여완료',
    },
    complete: {
      title: '뮤직비디오 시청 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n뮤직비디오를 함께 조회 했어요.`,
      buttonLabel: '확인',
    },
  },

  VOTECOIN: {
    confirm: {
      title: '오늘 투표권을 모았나요?',
      description: () => '투표권을 모으고 왔다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '투표권 사용 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n투표권을 함께 모았어요.`,
      buttonLabel: '확인',
    },
  },

  REPORT: {
    confirm: {
      title: '오늘 기사에 좋아요를 눌렀나요?',
      description: () =>
        '기사에 좋아요를 누르고 왔다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '오늘의 기사 좋아요 누르기 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n기사에 좋아요를 함께 눌렀어요.`,
      buttonLabel: '확인',
    },
  },

  HASHTAG: {
    confirm: {
      title: '오늘 SNS에 해시태그 언급을 했나요?',
      description: () => 'SNS에 해시태그 언급을 했다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '해시태그 총공 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\nSNS에 해시태그 언급을 했어요.`,
      buttonLabel: '확인',
    },
  },

  MELONKCHART: {
    confirm: {
      title: '멜론 K차트 응원을 완료했나요?',
      description: () => '멜론 K차트 응원을 완료했다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '멜론 K차트 응원 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n멜론 K차트 응원에 참여했어요.`,
      buttonLabel: '확인',
    },
  },

  RADIO: {
    confirm: {
      title: '라디오 응원을 완료했나요?',
      description: () => '라디오 응원을 완료했다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '라디오 응원 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n라디오 응원에 참여했어요.`,
      buttonLabel: '확인',
    },
  },

  MELONWEEKLY: {
    confirm: {
      title: '오늘 멜론 주간인기상 투표를 완료했나요?',
      description: () =>
        '멜론 주간인기상 투표를 완료했다면\n참여완료를 눌러주세요.',
      buttonLabel: '참여완료',
    },
    complete: {
      title: '멜론 주간인기상 투표 완료!',
      description: ({ typeCompletedCount }) =>
        `현재 ${typeCompletedCount}명의 VIP가\n멜론 주간인기상 투표에 참여했어요.`,
      buttonLabel: '확인',
    },
  },
} satisfies Record<CHEERING_CATEGORY, CheeringDialogConfig>;

export const urgentDetailMock: UrgentDetail[] = [
  // {
  //   menuType: 'MUSIC',
  //   detailId: 2,
  //   category: 'STREAMING',
  //   title: ' 테스트1',
  //   platformNames: ['melon'],
  //   eventEndAt: '2026-08-22T23:59:59',
  // },
  // {
  //   menuType: 'VOTE',
  //   detailId: 2,
  //   category: 'AWARDS',
  //   title: ' 테스트2',
  //   platformNames: ['mubeat'],
  //   eventEndAt: '2026-08-22T23:59:59',
  // },
];
