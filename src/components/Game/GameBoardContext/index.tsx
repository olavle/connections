import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IGameBoardWord } from "../types";
import * as R from "ramda";
import { getUpdatedWordsList, groupeWordsByCategory } from "../lib/lib";

const MAX_SELECTED_WORDS = 4 as const;

interface IContext {
  words: IGameBoardWord[];
  setWords: React.Dispatch<React.SetStateAction<IGameBoardWord[]>>;
  toggleWordSelect: (word: string) => void;
  selectedWords: IGameBoardWord[];
  isIncompleteSelection: boolean;
  checkIsCorrectWords: () => void;
  wrongAnswers: number;
}

export const GameBoardContext = createContext<IContext | null>(null);

export const GameBoardContextProvider = ({
  children,
  inputWords,
}: {
  children: ReactNode;
  inputWords: IGameBoardWord[] | null;
}) => {
  const [words, setWords] = useState<IGameBoardWord[]>(inputWords || []);
  const [wrongAnswers, setWrongAnswers] = useState(1);

  const updateWords = (newWords: IGameBoardWord[]) => {
    const updatedWords = getUpdatedWordsList(newWords, words);

    setWords(updatedWords);
  };

  const selectedWords = words.filter(({ isSelected }) => isSelected);

  const isIncompleteSelection = selectedWords.length < MAX_SELECTED_WORDS;

  const toggleWordSelect = (inputWord: string) => {
    const selectedWord = words.find(({ word }) => word === inputWord);

    if (!selectedWord) {
      throw new Error("Selected word has to exist");
    }

    const updatedWord: IGameBoardWord = {
      ...selectedWord,
      isSelected: isIncompleteSelection ? !selectedWord.isSelected : false,
    };

    setWords(
      words.map((word) => {
        return word.word === selectedWord.word ? updatedWord : word;
      })
    );
  };

  const checkIsCorrectWords = () => {
    if (selectedWords.length < 4) {
      return;
    }
    if (wrongAnswers < 3) {
      const groupedWords = groupeWordsByCategory(selectedWords);

      if (groupedWords.length === 1) {
        console.log("correct");
        const words = groupedWords[0];

        updateWords(
          words.map((word) => ({
            ...word,
            isGuessedCorrect: true,
            isSelected: false,
          }))
        );

        return;
      }

      setWrongAnswers(wrongAnswers + 1);
    }
  };

  return (
    <GameBoardContext.Provider
      value={{
        words,
        setWords,
        toggleWordSelect,
        selectedWords,
        isIncompleteSelection,
        checkIsCorrectWords,
        wrongAnswers,
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};

export const useGameBoardContext = () => {
  const context = useContext(GameBoardContext);

  if (!context) {
    throw new Error("context needs provider");
  }

  return context;
};
