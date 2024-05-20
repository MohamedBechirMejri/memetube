import { motion } from "framer-motion";

type Props = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

export default function Toggle({ checked, setChecked }: Props) {
  return (
    <button
      className="ri ng relative flex h-8 w-16 gap-4 rounded-full bg-gray-500 bg-opacity-30"
      onClick={() => setChecked(!checked)}
    >
      <motion.span
        initial={{
          x: checked ? "100%" : "0%",
          backgroundColor: checked ? "#14b8a6" : "#f43f5e",
        }}
        animate={{
          x: checked ? "100%" : "0%",
          backgroundColor: checked ? "#14b8a6" : "#f43f5e",
        }}
        className="absolute size-8 rounded-full shadow-md"
      />
    </button>
  );
}
