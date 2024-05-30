import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import L from "next/link";
import { useEffect, useState } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { Category as TCategory } from "~/types/Video";
import { motion } from "framer-motion";

const Link = motion(L);

export default function Categories() {
  const [categories, setCategories] = useState<TCategory[]>([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => doc.data()) as TCategory[];
        setCategories(cats);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <div className="grid h-full grid-cols-2 grid-rows-1 gap-4 overflow-y-scroll py-2">
      <div className="flex h-max flex-col gap-4 px-2">
        {categories.map(
          (category, i) =>
            i % 2 === 0 && (
              <Category key={category.id} category={category} i={i} />
            ),
        )}
      </div>

      <div className="flex h-max flex-col gap-4 px-2">
        {categories.map(
          (category, i) =>
            i % 2 === 1 && (
              <Category key={category.id} category={category} i={i} />
            ),
        )}
      </div>
    </div>
  );
}

const Category = ({ category, i }: { category: TCategory; i: number }) => {
  return (
    <Link
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 0.3,
        delay: i > 6 ? 0 : i * 0.1,
        scale: { type: "spring", damping: 10, stiffness: 100, delay: 0 },
      }}
      href={`/search/c/${category.id}`}
      key={category.id}
      className="relative overflow-hidden rounded-lg"
    >
      <h2 className="ghosting-text center absolute z-10 w-max max-w-full text-center text-xl font-semibold text-gray-300">
        {category.name}
      </h2>
      <Image
        src={category.image}
        alt={category.name}
        className="h-full w-full object-cover brightness-75"
        unoptimized
        width={400}
        height={400}
      />
    </Link>
  );
};
