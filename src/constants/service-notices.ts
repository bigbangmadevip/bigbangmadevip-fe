export type ServiceNotice = {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  pinned: boolean;
};

export const SERVICE_NOTICES: ServiceNotice[] = [
  {
    id: '1',
    title: '[수정] 스트리밍 리스트 ver.2로 업데이트 됐어요.',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 음원총공팀입니다.\n\n스트리밍 리스트 일부 구성이 수정되어 ver.2로 업데이트 되었습니다.\n\n기존 리스트를 사용 중이셨던 VIP분들은 최신 리스트로 다시 확인 후 스트리밍에 참여해주세요.',
    pinned: true,
  },
  {
    id: '2',
    title: '[모집] 멜론 아이디가 부족해요.',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 음원총공팀입니다.\n\n원활한 총공 진행을 위해 멜론 아이디를 모집하고 있어요.\n\nVIP 여러분의 많은 참여를 부탁드립니다.',
    pinned: true,
  },
  {
    id: '3',
    title: '[모금] 음원 총공 모금 40% 달성 안내',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 음원총공팀입니다.\n\n음원 총공 모금이 목표 금액의 40%를 달성했어요.\n\n참여해주신 모든 VIP분들께 감사드립니다.',
    pinned: true,
  },
  {
    id: '4',
    title: '[변경] 오늘 다운로드 총공 시간이 변경됐어요. 오후 7시 → 오후 8시',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 음원총공팀입니다.\n\n오늘 예정된 다운로드 총공 시간이 오후 7시에서 오후 8시로 변경되었습니다.\n\n변경된 시간을 확인해주세요.',
    pinned: false,
  },
  {
    id: '5',
    title: '[업데이트] 최신 스밍리스트를 확인해주세요',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 음원총공팀입니다.\n\n최신 스트리밍 리스트가 업데이트되었습니다.\n\n참여 전 반드시 최신 리스트를 확인해주세요.',
    pinned: false,
  },
  {
    id: '6',
    title: '[현황] 다운로드 총공 참여 현황을 공유드려요',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 음원총공팀입니다.\n\n현재 다운로드 총공 참여 현황을 공유드립니다.\n\n남은 시간에도 많은 참여를 부탁드려요.',
    pinned: false,
  },
  {
    id: '7',
    title: '[현황] 이번 주 음악방송 투표 일정 안내',
    createdAt: '2026. 08. 19',
    content:
      '안녕하세요, 투표총공팀입니다.\n\n이번 주 음악방송 투표 일정이 업데이트되었습니다.\n\n방송별 투표 기간과 마감 시간이 다르니, 일정 확인 후 놓치지 않게 참여해주세요.',
    pinned: false,
  },
];

export function getServiceNotice(noticeId: string) {
  return SERVICE_NOTICES.find(({ id }) => id === noticeId);
}
