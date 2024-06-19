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
      <CardContent className="flex w-full h-full items-center justify-center">
        {children}
      </CardContent>
    </Card>
  );
}

export default function CardGrid() {
  const [grid, setGrid] = useState({
    col1: [
      { name: "foo", color: "bg-red-500" },
      { name: "bar", color: "bg-green-500" },
      { name: "baz", color: "bg-blue-500" },
    ],
    col2: [
      { name: "qux", color: "bg-pink-500" },
      { name: "quux", color: "bg-teal-500" },
      { name: "corge", color: "bg-yellow-500" },
    ],
    col3: [
      { name: "grault", color: "bg-purple-500" },
      { name: "garply", color: "bg-orange-500" },
      { name: "waldo", color: "bg-indigo-500" },
    ],
  });

  return (
    <main className="h-screen p-24 grid grid-cols-3">
      {grid.col1.map((m) => (
        <CardComponent key={m.name} name={m.name} color={m.color}>
          <section className="text-white flex gap-2">
            <MoveLeftIcon size={40} />
            <MoveDownIcon size={40} />
            <MoveUpIcon size={40} />
            <MoveRightIcon size={40} />
          </section>
        </CardComponent>
      ))}
      {grid.col2.map((m) => (
        <CardComponent key={m.name} name={m.name} color={m.color}>
          <section className="text-white flex gap-2">
            <MoveLeftIcon size={40} />
            <MoveDownIcon size={40} />
            <MoveUpIcon size={40} />
            <MoveRightIcon size={40} />
          </section>
        </CardComponent>
      ))}
      {grid.col3.map((m) => (
        <CardComponent key={m.name} name={m.name} color={m.color}>
          <section className="text-white flex gap-2">
            <MoveLeftIcon size={40} />
            <MoveDownIcon size={40} />
            <MoveUpIcon size={40} />
            <MoveRightIcon size={40} />
          </section>
        </CardComponent>
      ))}
    </main>
  );
}
