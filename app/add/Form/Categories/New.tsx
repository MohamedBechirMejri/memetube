import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbX } from "react-icons/tb";
import { Input } from "~/components/ui/input";
import { Category } from "~/types/Video";

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);
const fetchGifs = (q: string) => gf.search(q, { limit: 12 });

type Props = {
  db: Firestore;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewCategory({ db, setIsModalVisible }: Props) {
  const [gifs, setGifs] = useState<GifsResult>();
  const [input, setInput] = useState("");

  const addVideo = async (url: string) => {
    const id = nanoid(8);

    const c: Category = {
      id,
      image: url,
      name: input,
    };

    await setDoc(doc(db, "categories", id), c);

    setIsModalVisible(false);
  };

  useEffect(() => {
    const search = async () => {
      if (!input) return;

      const res = await fetchGifs(input);
      setGifs(res);
    };

    const timeout = setTimeout(search, 500);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div className="center fixed z-[80] flex h-2/3 w-[90%] grid-rows-[auto,minmax(0,1fr)] flex-col items-center gap-4 rounded-2xl bg-slate-900 p-4 shadow">
      <button
        className="absolute right-6 top-4 z-50 text-3xl text-gray-500"
        onClick={() => setIsModalVisible(false)}
      >
        <TbX />
      </button>

      <h1 className="pb-2 pt-1">New Category</h1>
      <Input
        placeholder="Category name"
        onChange={async (e) => setInput(e.target.value.trim())}
        className="w-full rounded-2xl border-none bg-slate-500 bg-opacity-10 p-6 text-lg"
      />
      <div className="grid h-full w-full grid-cols-3 gap-2 overflow-auto">
        {gifs &&
          gifs.data.map((g) => (
            <div
              key={g.id}
              className="w-full"
              onClick={() => {
                if (input) addVideo(g.images.original.url);
              }}
            >
              <Image
                width={g.images.original.width}
                height={g.images.original.height}
                src={g.images.original.url}
                alt={g.title}
                className="h-full w-full rounded object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
