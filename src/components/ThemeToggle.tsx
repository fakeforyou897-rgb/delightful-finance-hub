import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  const toggle = () => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);

    const root = document.documentElement;
    root.classList.add("theme-transitioning");

    const next = !light;
    setLight(next);
    root.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");

    transitionTimeout.current = setTimeout(() => {
      root.classList.remove("theme-transitioning");
      transitionTimeout.current = null;
    }, 450);
  };

  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.82, rotate: -12 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-surface/60 backdrop-blur hover:text-gold transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={light ? "sun" : "moon"}
          initial={{ rotate: -120, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 120, scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center"
        >
          {light ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
