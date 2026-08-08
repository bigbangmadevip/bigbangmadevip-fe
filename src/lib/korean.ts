export function getObjectParticle(word: string): '을' | '를' {
  const trimmedWord = word.trim();

  for (let index = trimmedWord.length - 1; index >= 0; index -= 1) {
    const charCode = trimmedWord.charCodeAt(index);

    // 한글 완성형 범위: 가(0xac00) ~ 힣(0xd7a3)
    if (charCode >= 0xac00 && charCode <= 0xd7a3) {
      const hasFinalConsonant = (charCode - 0xac00) % 28 !== 0;

      return hasFinalConsonant ? '을' : '를';
    }
  }

  // 한글을 찾지 못했을 때 기본값
  return '를';
}

export function withObjectParticle(word: string): string {
  return `${word}${getObjectParticle(word)}`;
}
