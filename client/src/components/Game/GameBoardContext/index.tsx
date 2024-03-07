import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IGameBoardWord } from "../types";
import { getUpdatedWordsList, groupWordsByCategory } from "../lib/lib";

const MAX_SELECTED_WORDS = 4;
const MAX_TRIES = 3;

interface IWrongAnswerMessage {
  visible: boolean;
  correctAnswers: number;
}

interface IContext {
  words: IGameBoardWord[];
  setWords: React.Dispatch<React.SetStateAction<IGameBoardWord[]>>;
  toggleWordSelect: (word: string) => void;
  selectedWords: IGameBoardWord[];
  isIncompleteSelection: boolean;
  checkIsCorrectWords: () => void;
  wrongAnswers: number;
  correctWords: IGameBoardWord[];
  wrongAnswerMessage: IWrongAnswerMessage;
}

// that's a bad name dont care rollin hard
const DEFAULT_WRONG_ANSWER_MESSAGE = {
  visible: false,
  correctAnswers: 0,
};

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
  const [correctWords, setCorrectWords] = useState<IGameBoardWord[]>([]);
  const [wrongAnswerMessage, setWrongAnswerMessage] =
    useState<IWrongAnswerMessage>(DEFAULT_WRONG_ANSWER_MESSAGE);

  const updateWords = (newWords: IGameBoardWord[], words: IGameBoardWord[]) => {
    const updatedWords = getUpdatedWordsList(newWords, words);

    setWords(updatedWords);
  };

  const selectedWords = words.filter(({ isSelected }) => isSelected);

  const isIncompleteSelection = selectedWords.length < MAX_SELECTED_WORDS;

  const toggleWordSelect = (inputWord: string) => {
    const selectedWord = words.find(({ word }) => word === inputWord);

    if (!selectedWord) {
      return;
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

    setCorrectWords([...correctWords, ...updatedCorrectWords]);
    setWords(restWords);
  };

  // could be made into a toast (not the bread)
  const handleShowErrorMessage = (
    mostGuessedCategoryWords: IGameBoardWord[]
  ) => {
    setWrongAnswerMessage({
      visible: true,
      correctAnswers: mostGuessedCategoryWords.length,
    });
    setTimeout(() => {
      setWrongAnswerMessage(DEFAULT_WRONG_ANSWER_MESSAGE);
    }, 5000);
  };

  const handleWrongAnswer = (groupedWords: IGameBoardWord[][]) => {
    setWrongAnswers(wrongAnswers + 1);
    handleShowErrorMessage(groupedWords[0]);
  };

  const checkIsCorrectWords = () => {
    if (selectedWords.length < 4) {
      return;
    }
    setWrongAnswerMessage(DEFAULT_WRONG_ANSWER_MESSAGE);
    // maybe add the sorting to separate function
    // maybe refactor this whole spaghetti func?
    // maybe refactor this whole spaghetti file?
    // howboudah
    const groupedWords = groupWordsByCategory(selectedWords).sort(
      (a, b) => b.length - a.length
    );

    if (groupedWords.length === 1) {
      handleCorrectAnswer(groupedWords[0], words);
      return;
    }

    handleWrongAnswer(groupedWords);
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
        correctWords,
        wrongAnswerMessage,
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
