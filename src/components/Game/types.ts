export interface IGameBoardWord {
  categoryId: string;
  isSelected: boolean;
  word: string;
  isGuessedCorrect?: boolean;
}
