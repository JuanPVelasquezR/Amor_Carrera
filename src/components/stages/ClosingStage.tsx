import { motion } from 'framer-motion';
import { BookOpen, Compass, HelpCircle } from 'lucide-react';
import { CLOSING_NOTE, type StageId } from '../../data/content';

interface ClosingStageProps {
  onJumpTo: (stage: StageId) => void;
}

export function ClosingStage({ onJumpTo }: ClosingStageProps) {
  return (
    <section
      aria-labelledby="closing-heading"
      className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col justify-between px-5 pt-24 pb-10 safe-pb"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 flex-col justify-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d9b872]">
          {CLOSING_NOTE.dedication}
        </p>

        <div className="surface-card mt-4 border-[#d9b872]/25 p-6 sm:p-8">
          <h2
            id="closing-heading"
            className="font-serif-editorial text-[1.95rem] font-medium leading-[1.28] text-[#eef2f7] sm:text-[2.25rem]"
          >
            “{CLOSING_NOTE.message}”
          </h2>

          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <span className="h-2 w-2 rounded-full bg-[#52e0b7]" />
            <span className="text-xs text-[#98a6bc]">
              Tómate el tiempo que necesites.
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col gap-2.5">
        <p className="mb-1 text-center text-xs text-[#7f8fa6]">
          Puedes volver a cualquier parte cuando quieras
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => onJumpTo('thoughts')}
            className="btn-base btn-secondary px-3 text-xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#d9b872]" />
            <span>Mis pensamientos</span>
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('questions')}
            className="btn-base btn-secondary px-3 text-xs"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#52e0b7]" />
            <span>Preguntas</span>
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('simulator')}
            className="btn-base btn-secondary px-3 text-xs"
          >
            <Compass className="h-3.5 w-3.5 text-[#6aa9ff]" />
            <span>Simulador</span>
          </button>
        </div>
      </div>
    </section>
  );
}
