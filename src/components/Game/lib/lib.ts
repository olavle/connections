import { IGameBoardWord } from "../types";
import * as R from "ramda";

export const groupeWordsByCategory = R.groupWith<IGameBoardWord>(
  (a, b) => a.categoryId === b.categoryId
);

export const getUpdatedWordsList = (
  newWords: IGameBoardWord[],
  oldWords: IGameBoardWord[]
) =>
  oldWords.map((word) => {
    const updatedWord = newWords.find((newWord) => newWord.word === word.word);

    return !updatedWord ? word : updatedWord;
  });
