"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardItem } from "@/interfaces/CardItem";
import { cn } from "@/lib/utils";
import {
  MaximizeIcon,
  MinimizeIcon,
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon,
} from "lucide-react";
import { memo } from "react";
import useCardStore from "../hooks/useCardStore";

function CardComponent({
  index,
  cardItem,
  column,
}: {
  index: number;
  cardItem: CardItem;
  column: 1 | 2 | 3;
}) {
  const { handleCollapse, handleMove } = useCardStore();

  function collapse() {
    handleCollapse(column, index);
  }

  function move(direction: "up" | "down" | "left" | "right") {
    handleMove({ direction, column, index, cardItem });
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

const MemoizedCardComponent = memo(CardComponent);

export default function CardLayout() {
  const { layout } = useCardStore();

  return (
    <main className="p-24 flex justify-center gap-4">
      {Object.entries(layout).map(([column, cardItems]) => {
        return (
          <section className="flex flex-col w-[350px] gap-4" key={column}>
            {cardItems.map((cardItem, index) => (
              <MemoizedCardComponent
                key={cardItem.name}
                cardItem={cardItem}
                index={index}
                column={Number(column) as 1 | 2 | 3}
              />
            ))}
          </section>
        );
      })}
    </main>
  );
}
