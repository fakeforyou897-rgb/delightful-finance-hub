import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  const applyTheme = (next: boolean) => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    setLight(next);
    root.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      root.classList.remove("theme-transitioning");
      transitionTimeout.current = null;
    }, 450);
  };

  const toggle = () => {
    const next = !light;
    const doc = document as ViewTransitionDoc;

    // Graceful fallback for browsers without View Transitions
    if (!doc.startViewTransition) {
      applyTheme(next);
      return;
    }

    // Origin of the ripple = center of the toggle button
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => applyTheme(next));

    transition.ready
      .then(() => {
        document.documentElement.style.setProperty("--vt-x", `${x}px`);
        document.documentElement.style.setProperty("--vt-y", `${y}px`);
        document.documentElement.style.setProperty("--vt-r", `${radius}px`);
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* transition skipped — theme already applied */
      });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 420, damping: 16 }}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-surface/60 backdrop-blur transition-colors duration-300 hover:border-gold/50 hover:text-gold"
    >
      {/* soft glow halo on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--color-gold, #facc15) 22%, transparent) 0%, transparent 72%)",
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={light ? "sun" : "moon"}
          initial={{ rotate: -120, scale: 0, opacity: 0, y: 8 }}
          animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
          exit={{ rotate: 120, scale: 0, opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="relative flex items-center justify-center"
        >
          {light ? (
            <Sun className="h-4 w-4 drop-shadow-[0_0_6px_rgba(250,204,21,0.55)]" />
          ) : (
            <Moon className="h-4 w-4 drop-shadow-[0_0_6px_rgba(147,197,253,0.5)]" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
