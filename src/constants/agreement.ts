export type AgreementKey = 'terms' | 'privacy';

export type AgreementItem = {
  key: AgreementKey;
  label: string;
  detailTitle: string;
  detailContent: string;
};

export const AGREEMENTS: AgreementItem[] = [
  {
    key: 'terms',
    label: '(필수) 서비스 이용약관 동의',
    detailTitle: '서비스 이용약관',
    detailContent:
      '본 이용약관은 VIP 서비스의 이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임 사항을 규정합니다. 서비스를 이용하기 전에 아래 내용을 확인해 주세요.',
  },
  {
    key: 'privacy',
    label: '(필수) 개인정보처리방침 동의',
    detailTitle: '개인정보처리방침',
    detailContent:
      'VIP(이하 “서비스”)는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관계 법령을 준수합니다. 이 방침은 서비스가 어떤 개인정보를 어떤 목적으로 처리하고, 언제까지 보유하며, 이용자가 어떤 권리를 행사할 수 있는지를 안내합니다.',
  },
];
