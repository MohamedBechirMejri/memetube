"use client";

import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { firebaseConfig } from "~/lib/firebase";
import { Category } from "~/types/Video";

export default function Search() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [input, setInput] = useState("");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => doc.data()) as Category[];
        setCategories(cats);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <main className="flex h-full flex-col items-center gap-8 p-4 pt-16">
      <Input
        placeholder="Category name"
        onChange={async (e) => setInput(e.target.value.trim())}
        className="w-full rounded-2xl border-none bg-slate-500 bg-opacity-10 p-6 text-lg"
      />
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            href={`/search/c/${category.id}`}
            key={category.id}
            className="relative overflow-hidden rounded-lg ring-rose-500 ring-opacity-20 transition-all duration-300 hover:ring"
          >
            <h2 className="ghosting-text absolute flex h-full w-full items-center justify-center bg-black bg-opacity-20 text-xl font-semibold text-gray-300">
              {category.name}
            </h2>
            <Image
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover"
              unoptimized
              width={400}
              height={400}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
