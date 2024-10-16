import { motion, AnimatePresence } from "framer-motion";

export default function FormInput({
  required,
  placeHolder,
  name,
  type,
  onChange,
  value,
  error,
  touched,
  textArea,
  disabled,
}) {
  return (
    <div className="relative z-0 flex flex-col w-full">
      <AnimatePresence>
        {value && (
          <motion.label
            initial={{ top: "-9px" }}
            animate={{ top: "-12px" }}
            exit={{ top: "-9px" }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeInOut",
            }}
            className={`absolute left-2 rounded bg-secondary px-1 text-sm 
             text-gray-500`}
          >
            {required ? placeHolder + "*" : placeHolder}
          </motion.label>
        )}
      </AnimatePresence>
      <input
        name={name}
        type={type || "text"}
        onChange={onChange}
        value={value}
        placeholder={required ? placeHolder + "*" : placeHolder}
        className={`${
          touched && error && "border-red-500 ring-red-500"
        } w-full rounded-md border px-4 py-2 bg-secondary border-[#6c6c6c] text-[#6c6c6c] outline-none ring-none focus:border-primary`}
      />
      {touched && error && (
        <span className="mt-1 text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
