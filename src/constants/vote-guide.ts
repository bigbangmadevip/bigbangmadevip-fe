export const VOTE_GUIDE_THUMBNAIL = {
  musiccore: '/images/voteguidethumbnail/musiccore.png',
  musicbank: '/images/voteguidethumbnail/musicbank.png',
  inkigayo: '/images/voteguidethumbnail/inkigayo.png',
  showchampion: '/images/voteguidethumbnail/showchampion.png',
  mcountdown: '/images/voteguidethumbnail/mcountdown.png',
  theshow: '/images/voteguidethumbnail/theshow.png',
  melonWeekly: '/images/voteguidethumbnail/melonweekly.png',
  mama: '/images/voteguidethumbnail/mama.png',
  mma: '/images/voteguidethumbnail/mma.png',
  podoal: '/images/voteguidethumbnail/podoal.png',
  bugs: '/images/voteguidethumbnail/bugs.png',
  bstage: '/images/voteguidethumbnail/bstage.png',
} as const;

export type voteguideThumbnailCode = keyof typeof VOTE_GUIDE_THUMBNAIL;
