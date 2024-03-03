import { ReactNode, createContext, useContext, useState } from "react";
import { IGameBoardWord } from "../types";
import * as R from "ramda";

const MAX_SELECTED_WORDS = 4 as const;

interface IContext {
  words: IGameBoardWord[];
  setWords: React.Dispatch<React.SetStateAction<IGameBoardWord[]>>;
  toggleWordSelect: (word: string) => void;
  selectedWords: IGameBoardWord[];
  isIncompleteSelection: boolean;
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

  const selectedWords = words.filter(({ isSelected }) => isSelected);

  const isIncompleteSelection = selectedWords.length < MAX_SELECTED_WORDS;

  const toggleWordSelect = (inputWord: string) => {
    const selectedWord = words.find(({ word }) => word === inputWord);

    if (!selectedWord) {
      throw new Error("Selected word has to exist");
    }

    const editedWord: IGameBoardWord = {
      ...selectedWord,
      isSelected: isIncompleteSelection ? !selectedWord.isSelected : false,
    };

    setWords(
      words.map((word) => {
        return word.word === selectedWord.word ? editedWord : word;
      })
    );
  };

  return (
    <GameBoardContext.Provider
      value={{
        words,
        setWords,
        toggleWordSelect,
        selectedWords,
        isIncompleteSelection,
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
