export type VoteAppPlatform =
  | 'idolchamp'
  | 'coogoong'
  | 'mubeat'
  | 'muniverse'
  | 'linc'
  | 'higher';

type VoteAppLinks = {
  ios: string;
  android: string;
};

export const VOTE_APP_LINKS: Record<VoteAppPlatform, VoteAppLinks> = {
  idolchamp: {
    ios: 'https://apps.apple.com/kr/app/idolchamp/id1185735018',
    android:
      'intent://#Intent;scheme=android-app;package=com.nwz.ichampclient;end',
  },
  coogoong: {
    ios: 'https://apps.apple.com/us/app/coogoong/id1641638840?l=ko',
    android:
      'intent://#Intent;scheme=android-app;package=com.contentsmadang.fancast;end',
  },
  mubeat: {
    ios: 'https://apps.apple.com/kr/app/%EB%AE%A4%EB%B9%97-mubeat-kpop-%ED%8C%AC%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%AA%A8%EB%93%A0-%EA%B2%83/id1320789688',
    android:
      'intent://#Intent;scheme=android-app;package=com.vlending.apps.mubeat;end',
  },
  muniverse: {
    ios: 'https://apps.apple.com/kr/app/muniverse/id6749677921',
    android:
      'intent://#Intent;scheme=android-app;package=com.tnk.muniverse;end',
  },
  linc: {
    ios: 'https://apps.apple.com/kr/app/linc-%EB%A7%81%ED%81%AC/id6467824343',
    android:
      'intent://#Intent;scheme=android-app;package=io.stayge.youmeonapp;end',
  },
  higher: {
    ios: 'https://apps.apple.com/kr/app/higher-%ED%95%98%EC%9D%B4%EC%96%B4/id1672001935',
    android:
      'intent://#Intent;scheme=android-app;package=com.dalcomsoft.mysu.a;end',
  },
};

export function getVoteAppLink(platform: VoteAppPlatform) {
  const links = VOTE_APP_LINKS[platform];

  if (typeof navigator === 'undefined') return links.ios;

  return /Android/i.test(navigator.userAgent) ? links.android : links.ios;
}
