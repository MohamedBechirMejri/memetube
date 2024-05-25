"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import Categories from "./Categories";
import { useVideoStore } from "~/lib/globals/video";

export default function Search() {
  const { collection } = useVideoStore();

  const [input, setInput] = useState("");

  return (
    <main className="flex h-full flex-col items-center gap-8 p-4 pt-16">
      <Input
        placeholder="Category name"
        onChange={async (e) => setInput(e.target.value.trim())}
        className="w-full rounded-2xl border-none bg-slate-500 bg-opacity-10 p-6 text-lg"
      />
      <Categories />
    </main>
  );
}
