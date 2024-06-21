"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultCardLayout } from "@/config/defaultCardLayout";
import { cn } from "@/lib/utils";
import {
  MaximizeIcon,
  MinimizeIcon,
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon,
} from "lucide-react";
import { useState } from "react";

interface CardItem {
  name: string;
  color: string;
  collapsed: boolean;
}

function CardComponent({
  handleCollapse,
  index,
  cardItem,
  handleMove,
  column,
}: {
  index: number;
  cardItem: CardItem;
  handleCollapse: (args: { column: 1 | 2 | 3; index: number }) => void;
  handleMove: (args: {
    direction: "up" | "down" | "left" | "right";
    col: 1 | 2 | 3;
    index: number;
    cardItem: CardItem;
  }) => void;
  column: 1 | 2 | 3;
}) {
  function collapse() {
    handleCollapse({ column, index });
  }

  function move(direction: "up" | "down" | "left" | "right") {
    handleMove({ direction, col: column, index, cardItem });
  }

  return (
    <Card className={cn(cardItem.color, "text-white")}>
      <CardHeader>
        <CardTitle className="text-3xl flex justify-between items-center">
          <section className="flex items-center gap-2">
            <span>{cardItem.name}</span>
            <span className="flex gap-2">
              <MoveLeftIcon
                className="cursor-pointer"
                size={20}
                onClick={() => move("left")}
              />
              <MoveDownIcon
                className="cursor-pointer"
                size={20}
                onClick={() => move("down")}
              />
              <MoveUpIcon
                className="cursor-pointer"
                size={20}
                onClick={() => move("up")}
              />
              <MoveRightIcon
                className="cursor-pointer"
                size={20}
                onClick={() => move("right")}
              />
              {cardItem.collapsed ? (
                <MaximizeIcon onClick={collapse} size={20} />
              ) : (
                <MinimizeIcon onClick={collapse} size={20} />
              )}
            </span>
          </section>
        </CardTitle>
      </CardHeader>
      {!cardItem.collapsed && (
        <CardContent className="flex items-center justify-center h-[80px]" />
      )}
    </Card>
  );
}

export default function CardLayout() {
  const [layout, setLayout] = useState<{
    [key: number]: CardItem[];
  }>(defaultCardLayout);

  const handleMove = ({
    direction,
    col,
    index,
    cardItem,
  }: {
    direction: "up" | "down" | "left" | "right";
    col: 1 | 2 | 3;
    index: number;
    cardItem: CardItem;
  }) => {
    const newLayout = {
      1: [...layout[1]],
      2: [...layout[2]],
      3: [...layout[3]],
    };

    switch (direction) {
      case "left":
        if (col === 1) return;

        newLayout[(col - 1) as 1 | 2 | 3].unshift(cardItem);
        newLayout[col].splice(index, 1);
        break;
      case "right":
        if (col === 3) return;

        newLayout[(col + 1) as 1 | 2 | 3].unshift(cardItem);
        newLayout[col].splice(index, 1);
        break;
      case "up":
        if (index === 0) return;

        newLayout[col].splice(index, 1);
        newLayout[col].splice(index - 1, 0, cardItem);
        break;
      case "down":
        if (index === newLayout[col].length - 1) return;

        newLayout[col].splice(index, 1);
        newLayout[col].splice(index + 1, 0, cardItem);
        break;
      default:
        break;
    }

    setLayout(newLayout);
  };

  const handleCollapse = ({
    column,
    index,
  }: {
    column: 1 | 2 | 3;
    index: number;
  }) => {
    const newLayout = {
      1: [...layout[1]],
      2: [...layout[2]],
      3: [...layout[3]],
    };
    newLayout[column][index].collapsed = !newLayout[column][index].collapsed;
    setLayout(newLayout);
  };

  return (
    <main className="p-24 flex justify-center gap-4">
      {Object.entries(layout).map(([column, cardItems]) => {
        return (
          <section className="flex flex-col w-[350px] gap-4" key={column}>
            {cardItems.map((cardItem, index) => (
              <CardComponent
                key={cardItem.name}
                cardItem={cardItem}
                index={index}
                handleCollapse={handleCollapse}
                handleMove={handleMove}
                column={Number(column) as 1 | 2 | 3}
              />
            ))}
          </section>
        );
      })}
    </main>
  );
}
