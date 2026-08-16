import bstage from '@/assets/voteguidethumbnail/bstage.png';
import bugs from '@/assets/voteguidethumbnail/bugs.png';
import idolchampMusicShow from '@/assets/voteguidethumbnail/idolchamp-musicshow.png';
import inkigayoMusicShow from '@/assets/voteguidethumbnail/inga-musicshow.png';
import mamaAwards from '@/assets/voteguidethumbnail/mama-awards.png';
import mcountdownMusicShow from '@/assets/voteguidethumbnail/mcountdown-musicshow.png';
import melonWeekly from '@/assets/voteguidethumbnail/melon-weekly.png';
import mmaAwards from '@/assets/voteguidethumbnail/mma-awards.png';
import musicbankMusicShow from '@/assets/voteguidethumbnail/musicbank-musicshow.png';
import musiccoreMusicShow from '@/assets/voteguidethumbnail/musiccore-musicshow.png';
import podoal from '@/assets/voteguidethumbnail/podoal.png';
import showchampionMusicShow from '@/assets/voteguidethumbnail/showchampion-musicshow.png';
import theshowMusicShow from '@/assets/voteguidethumbnail/theshow-musicshow.png';

export const VOTE_GUIDE_THUMBNAIL = {
  musiccore: musiccoreMusicShow,
  musicbank: musicbankMusicShow,
  inkigayo: inkigayoMusicShow,
  showchampion: showchampionMusicShow,
  idolchamp: idolchampMusicShow,
  mcountdown: mcountdownMusicShow,
  theshow: theshowMusicShow,
  melonWeekly,
  mama: mamaAwards,
  mma: mmaAwards,
  podoal,
  bugs,
  bstage,
} as const;

export type voteguideThumbnailCode = keyof typeof VOTE_GUIDE_THUMBNAIL;
