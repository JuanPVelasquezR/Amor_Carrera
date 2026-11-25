import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CoverStageProps {
  onStart: () => void;
  hasProgress: boolean;
  onResume?: () => void;
}

export function CoverStage({ onStart, hasProgress, onResume }: CoverStageProps) {
  return (
    <section
      aria-labelledby="cover-heading"
      className="flex min-h-[100dvh] flex-col justify-between px-5 pt-20 pb-8 safe-pb"
    >
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
        {/* Minimal Physics x Biology astronomical-botanical emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-start"
          aria-hidden="true"
        >
          <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            className="overflow-visible"
          >
            {/* Outer orbital ring (Physics) */}
            <ellipse
              cx="34"
              cy="34"
              rx="28"
              ry="15"
              transform="rotate(-28 34 34)"
              stroke="#6aa9ff"
              strokeOpacity="0.65"
              strokeWidth="1.2"
            />
            {/* Secondary orbit */}
            <ellipse
              cx="34"
              cy="34"
              rx="24"
              ry="12"
              transform="rotate(42 34 34)"
              stroke="#d9b872"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
            {/* Delicate botanical leaf contour (Biology) */}
            <path
              d="M34 50C25.5 43.5 23 32.5 34 18C45 32.5 42.5 43.5 34 50Z"
              stroke="#52e0b7"
              strokeOpacity="0.88"
              strokeWidth="1.35"
              fill="rgba(82, 224, 183, 0.07)"
            />
            <path
              d="M34 23V49"
              stroke="#52e0b7"
              strokeOpacity="0.55"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="57" cy="22" r="2.2" fill="#6aa9ff" />
            <circle cx="15" cy="44" r="1.8" fill="#d9b872" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-medium uppercase tracking-[0.22em] text-[#d9b872]"
        >
          Para Luna Rodríguez (Abocito)
        </motion.p>

        <motion.h1
          id="cover-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-[2.45rem] font-medium leading-[1.08] tracking-[-0.01em] text-[#eef2f7] sm:text-5xl"
        >
          Un espacio tranquilo para pensar esta decisión.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-md text-[15.5px] leading-[1.7] text-[#b6c2d3]"
        >
          En vez de mandarte un texto eterno por WhatsApp, quise ordenar aquí lo que pienso, unas preguntas para ti y un par de ejercicios cortos para que escuches lo que sientes entre Física y Biología.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-[#8d9db4]"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6aa9ff]" />
            Solo leer y pensar
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52e0b7]" />
            Sin prisa, a tu ritmo
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9b872]" />
            100% privado en tu celular
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3"
      >
        <button type="button" onClick={onStart} className="btn-base btn-primary w-full py-3.5">
          <span>Empezar el recorrido</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        {hasProgress && onResume && (
          <button type="button" onClick={onResume} className="btn-base btn-secondary w-full py-3">
            <span>Continuar donde iba</span>
          </button>
        )}
      </motion.div>
    </section>
  );
}
