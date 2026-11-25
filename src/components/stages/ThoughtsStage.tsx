import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { THOUGHT_CHAPTERS } from '../../data/content';

interface ThoughtsStageProps {
  chapterIndex: number;
  onChangeChapter: (index: number) => void;
  onNextStage: () => void;
}

export function ThoughtsStage({
  chapterIndex,
  onChangeChapter,
  onNextStage,
}: ThoughtsStageProps) {
  const safeIndex = Math.max(0, Math.min(chapterIndex, THOUGHT_CHAPTERS.length - 1));
  const chapter = THOUGHT_CHAPTERS[safeIndex];
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === THOUGHT_CHAPTERS.length - 1;

  const goTo = (nextIdx: number) => {
    onChangeChapter(nextIdx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      aria-labelledby="thoughts-heading"
      className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col px-5 pt-20 pb-10 safe-pb"
    >
      {/* Chapter navigation pills */}
      <div
        role="tablist"
        aria-label="Capítulos de mis pensamientos"
        className="mb-6 flex items-center gap-2 overflow-x-auto pb-1"
      >
        {THOUGHT_CHAPTERS.map((item, idx) => {
          const active = idx === safeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => goTo(idx)}
              className={`btn-base !min-h-[44px] shrink-0 !rounded-full px-3.5 text-xs ${
                active
                  ? 'border border-[#d9b872]/50 bg-[#d9b872]/15 text-[#eef2f7]'
                  : 'border border-white/10 bg-[#0d1421]/70 text-[#8d9db4]'
              }`}
            >
              <span>0{idx + 1}</span>
              <span className="hidden sm:inline">· {item.kicker}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={chapter.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
          className="surface-card flex-1 p-5 sm:p-7"
        >
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-medium uppercase tracking-[0.18em] text-[#d9b872]">
              {chapter.kicker}
            </span>
            <span className="text-[#7f8fa6]">{chapter.indexLabel}</span>
          </div>

          <h2
            id="thoughts-heading"
            className="mt-2.5 text-3xl font-medium leading-[1.14] text-[#eef2f7] sm:text-4xl"
          >
            {chapter.title}
          </h2>

          <div className="mt-5 space-y-4 text-[15.5px] leading-[1.78] text-[#cdd7e5]">
            {chapter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {chapter.highlightQuote && (
            <blockquote className="mt-6 rounded-2xl border border-[#d9b872]/30 bg-[#d9b872]/[0.07] p-4 sm:p-5">
              <p className="font-serif-editorial text-2xl italic leading-snug text-[#f5ecd6]">
                “{chapter.highlightQuote}”
              </p>
              <p className="mt-2.5 text-xs text-[#b8ab8e]">
                Siento que ahí no hace falta decir nada más.
              </p>
            </blockquote>
          )}
        </motion.article>
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => goTo(safeIndex - 1)}
          className="btn-base btn-secondary px-4"
          aria-label="Capítulo anterior"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </button>

        {!isLast ? (
          <button
            type="button"
            onClick={() => goTo(safeIndex + 1)}
            className="btn-base btn-primary flex-1 px-4"
          >
            <span>Siguiente parte</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextStage}
            className="btn-base btn-primary flex-1 px-4"
          >
            <span>Ir a las preguntas</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
