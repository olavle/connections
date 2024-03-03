import { FC, useState } from "react";
import { GameBoard } from "./GameBoard";
import { IGameBoardWord } from "./types";
import { GameBoardContextProvider } from "./GameBoardContext";

interface IProps {}

const dummyWords: IGameBoardWord[] = [
  {
    isSelected: false,
    categoryId: "hot_items",
    word: "coffee",
  },
  {
    isSelected: false,
    categoryId: "hot_items",
    word: "sun",
  },
  {
    isSelected: false,
    categoryId: "hot_items",
    word: "lava",
  },
  {
    isSelected: false,
    categoryId: "hot_items",
    word: "fire",
  },
  {
    isSelected: false,
    categoryId: "hard_items",
    word: "concrete",
  },
  {
    isSelected: false,
    categoryId: "hard_items",
    word: "brick",
  },
  {
    isSelected: false,
    categoryId: "hard_items",
    word: "metal",
  },
  {
    isSelected: false,
    categoryId: "hard_items",
    word: "rock",
  },
  {
    isSelected: false,
    categoryId: "soft_items",
    word: "pillow",
  },
  {
    isSelected: false,
    categoryId: "soft_items",
    word: "snow",
  },
  {
    isSelected: false,
    categoryId: "soft_items",
    word: "cotton",
  },
  {
    isSelected: false,
    categoryId: "soft_items",
    word: "silk",
  },
  {
    isSelected: false,
    categoryId: "drinks",
    word: "juice",
  },
  {
    isSelected: false,
    categoryId: "drinks",
    word: "milk",
  },
  {
    isSelected: false,
    categoryId: "drinks",
    word: "wine",
  },
  {
    isSelected: false,
    categoryId: "drinks",
    word: "beer",
  },
];

export const Game: FC<IProps> = () => {
  // fetch words here
  return (
    <div>
      <GameBoardContextProvider inputWords={dummyWords}>
        <GameBoard />;
      </GameBoardContextProvider>
    </div>
  );
};
