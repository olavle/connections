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
import { getUpdatedWordsList, groupWordsByCategory } from "../lib/lib";

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

  const updateWords = (newWords: IGameBoardWord[], words: IGameBoardWord[]) => {
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
    if (selectedWord.isGuessedCorrect) {
      return;
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

  const handleCorrectAnswer = (
    selectedWords: IGameBoardWord[],
    allWords: IGameBoardWord[]
  ) => {
    const restWords = allWords.filter((word) => !word.isSelected);
    const updatedCorrectWords = selectedWords.map((word) => ({
      ...word,
      isGuessedCorrect: true,
      isSelected: false,
    }));

    setWords([...updatedCorrectWords, ...restWords]);
  };

  const checkIsCorrectWords = () => {
    if (selectedWords.length < 4) {
      return;
    }
    if (wrongAnswers < 3) {
      const groupedWords = groupWordsByCategory(selectedWords);

      if (groupedWords.length === 1) {
        handleCorrectAnswer(groupedWords[0], words);

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
