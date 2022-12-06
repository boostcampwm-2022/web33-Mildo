// eslint-disable-next-line
export const isCompleteKorean = (query: string) => {
  const incompleteKoreanRegex = /[ㄱ-ㅎㅏ-ㅣ]/;

  return !incompleteKoreanRegex.test(query);
};
