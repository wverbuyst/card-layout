"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon,
} from "lucide-react";
import { useState } from "react";

function CardComponent({
  name,
  color,
  children,
}: {
  name: string;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className={color}>
      <CardHeader>
        <CardTitle className="text-3xl text-white">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {children}
      </CardContent>
    </Card>
  );
}

export default function CardGrid() {
  const [grid, setGrid] = useState<{
    [key: number]: { name: string; color: string }[];
  }>({
    1: [
      { name: "foo", color: "bg-red-500" },
      { name: "bar", color: "bg-green-500" },
      { name: "baz", color: "bg-blue-500" },
    ],
    2: [
      { name: "qux", color: "bg-pink-500" },
      { name: "quux", color: "bg-teal-500" },
      { name: "corge", color: "bg-yellow-500" },
    ],
    3: [
      { name: "grault", color: "bg-purple-500" },
      { name: "garply", color: "bg-orange-500" },
      { name: "waldo", color: "bg-indigo-500" },
    ],
  });

  const handleMove = ({
    direction,
    col,
    index,
    item,
  }: {
    direction: "up" | "down" | "left" | "right";
    col: 1 | 2 | 3;
    index: number;
    item: { name: string; color: string };
  }) => {
    const newGrid = { 1: [...grid[1]], 2: [...grid[2]], 3: [...grid[3]] };

    switch (direction) {
      case "left":
        if (col === 1) return;
        // @ts-expect-error
        newGrid[col - 1].push(item);
        newGrid[col].splice(index, 1);
        break;
      case "right":
        if (col === 3) return;
        // @ts-expect-error
        newGrid[col + 1].push(item);
        newGrid[col].splice(index, 1);
        break;
      case "up":
        if (index === 0) return;
        newGrid[col].splice(index, 1);
        newGrid[col].splice(index - 1, 0, item);
        break;
      case "down":
        if (index === newGrid[col].length - 1) return;
        newGrid[col].splice(index, 1);
        newGrid[col].splice(index + 1, 0, item);
        break;
      default:
        break;
    }

    setGrid(newGrid);
  };

  return (
    <main className="p-24 flex justify-center gap-4">
      <section className="flex flex-col w-[350px] gap-4">
        {grid[1].map((m, i) => (
          <CardComponent key={m.name} name={m.name} color={m.color}>
            <section className="text-white flex gap-2">
              <MoveLeftIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "left",
                    col: 1,
                    index: i,
                    item: m,
                  })
                }
              />
              <MoveDownIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "down",
                    col: 1,
                    index: i,
                    item: m,
                  })
                }
              />

              <MoveUpIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "up",
                    col: 1,
                    index: i,
                    item: m,
                  })
                }
              />

              <MoveRightIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "right",
                    col: 1,
                    index: i,
                    item: m,
                  })
                }
              />
            </section>
          </CardComponent>
        ))}
      </section>
      <section className="flex flex-col w-[350px] gap-4">
        {grid[2].map((m, i) => (
          <CardComponent key={m.name} name={m.name} color={m.color}>
            <section className="text-white flex gap-2">
              <MoveLeftIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "left",
                    col: 2,
                    index: i,
                    item: m,
                  })
                }
              />
              <MoveDownIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "down",
                    col: 2,
                    index: i,
                    item: m,
                  })
                }
              />

              <MoveUpIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "up",
                    col: 2,
                    index: i,
                    item: m,
                  })
                }
              />

              <MoveRightIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "right",
                    col: 2,
                    index: i,
                    item: m,
                  })
                }
              />
            </section>
          </CardComponent>
        ))}
      </section>
      <section className="flex flex-col w-[350px] gap-4">
        {grid[3].map((m, i) => (
          <CardComponent key={m.name} name={m.name} color={m.color}>
            <section className="text-white flex gap-2">
              <MoveLeftIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "left",
                    col: 3,
                    index: i,
                    item: m,
                  })
                }
              />
              <MoveDownIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "down",
                    col: 3,
                    index: i,
                    item: m,
                  })
                }
              />
              <MoveUpIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "up",
                    col: 3,
                    index: i,
                    item: m,
                  })
                }
              />
              <MoveRightIcon
                className="cursor-pointer"
                size={40}
                onClick={() =>
                  handleMove({
                    direction: "right",
                    col: 3,
                    index: i,
                    item: m,
                  })
                }
              />
            </section>
          </CardComponent>
        ))}
      </section>
    </main>
  );
}
