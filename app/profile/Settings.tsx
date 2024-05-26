import { useState } from "react";
import { MdBlock } from "react-icons/md";
import Toggle from "~/components/Toggle";
import { useUserStore } from "~/lib/globals/user";
import Languages from "../add/Form/Languages";
import { LANGUAGES } from "../add/Form";
import { Button } from "~/components/ui/button";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { TbX } from "react-icons/tb";

export default function Settings({ close }: { close: () => void }) {
  const { user } = useUserStore();

  const db = getFirestore();

  const [nsfw, setNsfw] = useState(user?.preferences?.nsfw || false);
  const [languages, setLanguages] = useState([
    user?.preferences?.language || "any",
  ] as string[]); // "any" | "arabic" | "english"

  const saveSettings = async () => {
    await setDoc(
      doc(db, "users", user!.uid),
      { preferences: { nsfw, language: languages[0] } },
      { merge: true },
    );

    close();
  };

  return (
    <div className="flex h-full flex-col justify-between p-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <button className="pointer-events-none text-3xl opacity-0 ml-4">
            <TbX />
          </button>
          <h1 className="text-3xl font-bold">Settings</h1>
          <button className="text-3xl text-gray-500 mr-4" onClick={close}>
            <TbX />
          </button>
        </div>
        <div className="my-4 flex w-full items-center justify-between px-4">
          <label className="flex items-center gap-4 text-gray-400">
            <MdBlock />
            NSFW
          </label>

          <Toggle checked={nsfw} setChecked={setNsfw} />
        </div>

        <Languages
          LANGUAGES={LANGUAGES}
          languages={languages}
          setLanguages={setLanguages}
        />
      </div>

      <Button className="py-6 text-base" onClick={saveSettings}>
        Save Settings
      </Button>
    </div>
  );
}
