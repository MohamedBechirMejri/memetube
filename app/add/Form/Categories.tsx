import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { Category as TCategory } from "~/types/Video";

type Props = {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  db: any;
};

export default function Categories({ categories, setCategories, db }: Props) {
  const [CATEGORIES, setCATEGORIES] = useState<TCategory[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => doc.data()) as TCategory[];
        setCATEGORIES(cats);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <div className="grid h-full w-full grid-rows-[auto,minmax(0,1fr)] gap-4 p-4 pt-0">
      <label className="flex items-center gap-4 text-gray-400">
        <MdCategory />
        Categories
      </label>

      <div className="flex h-max max-h-full flex-wrap gap-4 overflow-y-auto rounded-2xl bg-slate-800 bg-opacity-10 p-4">
        {CATEGORIES.map((category, i) => {
          return (
            <button
              key={category.id}
              className={
                "flex h-max items-center gap-1 rounded-2xl p-4 text-sm font-medium capitalize leading-none" +
                (categories.includes(category.id)
                  ? " bg-blue-500 bg-opacity-15 text-blue-500"
                  : " bg-slate-900 bg-opacity-40 text-slate-300")
              }
              onClick={() => {
                setCategories((cats) => {
                  if (cats.includes(category.id))
                    return cats.filter((cat) => cat !== category.id);
                  else return [...cats, category.id];
                });
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
