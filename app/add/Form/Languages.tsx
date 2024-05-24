import { GrLanguage } from "react-icons/gr";
import { motion } from "framer-motion";
import { LiaCheckSolid } from "react-icons/lia";

type Props = {
  LANGUAGES: string[];
  languages: string[];
  setLanguages: (langs: string[]) => void;
};

export default function Languages({
  LANGUAGES,
  languages,
  setLanguages,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between px-4">
      <label className="flex items-center gap-4 text-gray-400">
        <GrLanguage />
        Language
      </label>

      <div className="flex gap-4">
        {LANGUAGES.map((lang, i) => {
          const isSelected = languages.includes(lang);
          const buttonAnimation = {
            color: isSelected ? "#14b8a6" : "#fff",
            backgroundColor: isSelected ? "#14b8a633" : "#ffffff00",
          };
          const tickAnimation = {
            width: isSelected ? "max-content" : 0,
            opacity: isSelected ? 1 : 0,
          };

          return (
            <motion.button
              initial={buttonAnimation}
              animate={buttonAnimation}
              key={"lang" + i + lang}
              className="flex items-center gap-2 rounded-xl p-2 capitalize"
              onClick={() => setLanguages([lang])}
            >
              {lang}
              <motion.span initial={tickAnimation} animate={tickAnimation}>
                <LiaCheckSolid />
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
