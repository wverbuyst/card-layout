import CardLayout from "@/components/card-layout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "CardLayout",
};

export default function Home() {
  return <CardLayout />;
}
