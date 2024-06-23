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
        <CardTitle className="text-3xl flex items-center justify-between">
          <span>{cardItem.name}</span>
          <span className="flex gap-2">
            <MoveLeftIcon
              className="cursor-pointer hidden lg:block"
              onClick={() => move("left")}
            />
            <MoveDownIcon
              className="cursor-pointer"
              onClick={() => move("down")}
            />
            <MoveUpIcon className="cursor-pointer" onClick={() => move("up")} />
            <MoveRightIcon
              className="cursor-pointer hidden lg:block"
              onClick={() => move("right")}
            />
            {cardItem.collapsed ? (
              <MaximizeIcon onClick={collapse} />
            ) : (
              <MinimizeIcon onClick={collapse} />
            )}
          </span>
        </CardTitle>
      </CardHeader>
      {!cardItem.collapsed && <CardContent className="h-[80px]" />}
    </Card>
  );
}

const MemoizedCardComponent = memo(CardComponent);

export default function CardLayout() {
  const { layout } = useCardStore();

  return (
    <main className="flex flex-col justify-center lg:flex-row items-stretch gap-2 p-4 lg:p-12 xl:p-24">
      {Object.entries(layout).map(([column, cardItems]) => {
        return (
          <section className="flex flex-col gap-2 lg:w-1/3" key={column}>
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
