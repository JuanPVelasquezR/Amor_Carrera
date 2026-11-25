import { useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bookmark, Check, RotateCcw } from 'lucide-react';
import { REFLECTION_QUESTIONS } from '../../data/content';

interface QuestionsStageProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onNextStage: () => void;
}

export function QuestionsStage({
  savedIds,
  onToggleSave,
  onNextStage,
}: QuestionsStageProps) {
  const [index, setIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const total = REFLECTION_QUESTIONS.length;
  const current = REFLECTION_QUESTIONS[index];
  const isSaved = savedIds.includes(current.id);
  const savedQuestions = REFLECTION_QUESTIONS.filter((q) => savedIds.includes(q.id));

  const goNext = () => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      setShowSummary(true);
    }
  };

  const goPrev = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -55) {
      goNext();
    } else if (info.offset.x > 55 && index > 0) {
      goPrev();
    }
  };

  return (
    <section
      aria-labelledby="questions-heading"
      className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col justify-between px-5 pt-20 pb-10 safe-pb"
    >
      <div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#52e0b7]">
              Solo para ti
            </p>
            <h2
              id="questions-heading"
              className="mt-1.5 text-3xl font-medium leading-tight text-[#eef2f7]"
            >
              Preguntas para pensar despacio
            </h2>
          </div>

          {!showSummary && savedIds.length > 0 && (
            <button
              type="button"
              onClick={() => setShowSummary(true)}
              className="btn-base btn-secondary !min-h-[44px] shrink-0 !rounded-full px-3 text-xs text-[#d9b872]"
            >
              <Bookmark className="h-3.5 w-3.5 fill-current" />
              <span>{savedIds.length}</span>
            </button>
          )}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-[#98a6bc]">
          No tienes que escribir nada ni contestarlas ya. Léelas a tu ritmo y, si alguna te mueve algo por dentro, márcala para tenerla presente.
        </p>
      </div>

      {!showSummary ? (
        <div className="my-6 flex flex-1 flex-col justify-center">
          {/* Dots indicator */}
          <div className="mb-4 flex items-center justify-between text-xs text-[#7f8fa6]">
            <span>
              Pregunta {index + 1} de {total}
            </span>
            <span>Desliza o usa los botones</span>
          </div>

          <div className="relative min-h-[310px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                className="surface-card flex min-h-[300px] cursor-grab flex-col justify-between p-6 active:cursor-grabbing sm:p-7"
              >
                <div>
                  <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-wider text-[#9fb0c7]">
                    {current.tag}
                  </span>

                  <p className="font-serif-editorial mt-5 text-[1.68rem] font-medium leading-[1.24] text-[#eef2f7] sm:text-[1.9rem]">
                    {current.text}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-xs leading-relaxed text-[#8d9db4]">{current.hint}</p>

                  <button
                    type="button"
                    onClick={() => onToggleSave(current.id)}
                    aria-pressed={isSaved}
                    className={`btn-base mt-4 w-full text-xs ${
                      isSaved
                        ? 'border border-[#d9b872]/50 bg-[#d9b872]/15 text-[#f2dfb0]'
                        : 'btn-secondary text-[#b6c2d3]'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-4 w-4 text-[#d9b872]" />
                        <span>Guardada para pensar luego</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        <span>Esta me hizo pensar</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
          className="surface-card my-6 flex-1 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-2xl font-medium text-[#eef2f7]">
              {savedQuestions.length > 0
                ? 'Las que más te resonaron'
                : 'Ya recorriste todas'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setShowSummary(false);
              }}
              className="btn-base btn-secondary !min-h-[44px] px-3 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Repasar</span>
            </button>
          </div>

          {savedQuestions.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {savedQuestions.map((q) => (
                <li
                  key={q.id}
                  className="rounded-xl border border-[#d9b872]/25 bg-[#d9b872]/[0.05] p-3.5"
                >
                  <span className="text-[11px] uppercase tracking-wider text-[#d9b872]">
                    {q.tag}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[#e6edf6]">{q.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-[#b6c2d3]">
              No hace falta marcar ninguna; las preguntas buenas se quedan dando vueltas solas y van tomando forma con los días.
            </p>
          )}
        </motion.div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!showSummary && index === 0}
          onClick={goPrev}
          className="btn-base btn-secondary px-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </button>

        {!showSummary ? (
          <button type="button" onClick={goNext} className="btn-base btn-primary flex-1 px-4">
            <span>{index === total - 1 ? 'Ver resumen' : 'Siguiente pregunta'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" onClick={onNextStage} className="btn-base btn-primary flex-1 px-4">
            <span>Pasar al termómetro</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
