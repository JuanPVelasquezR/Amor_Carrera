import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import {
  THERMOMETER_AXES,
  THERMOMETER_ITEMS,
  type AxisKey,
} from '../../data/content';

interface ThermometerStageProps {
  answers: Record<string, number>;
  onAnswer: (itemId: string, value: number) => void;
  onReset: () => void;
  onNextStage: () => void;
}

const CHOICES = [
  { value: 0, label: 'No mucho', desc: 'Casi no resuena conmigo hoy' },
  { value: 1, label: 'Algo', desc: 'Un poco, a veces aparece' },
  { value: 2, label: 'Mucho', desc: 'Sí, me pesa o me mueve bastante' },
];

export function ThermometerStage({
  answers,
  onAnswer,
  onReset,
  onNextStage,
}: ThermometerStageProps) {
  const total = THERMOMETER_ITEMS.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount >= total;

  const [stepIndex, setStepIndex] = useState<number>(() => {
    const firstMissing = THERMOMETER_ITEMS.findIndex((item) => answers[item.id] === undefined);
    return firstMissing === -1 ? total : firstMissing;
  });

  const showingResults = stepIndex >= total && allAnswered;
  const currentItem = THERMOMETER_ITEMS[Math.min(stepIndex, total - 1)];

  const handleSelect = (val: number) => {
    onAnswer(currentItem.id, val);
    if (stepIndex < total - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setStepIndex(total);
    }
  };

  const getAxisStats = (key: AxisKey) => {
    const items = THERMOMETER_ITEMS.filter((i) => i.axis === key);
    const maxScore = items.length * 2;
    const score = items.reduce((sum, item) => sum + (answers[item.id] ?? 0), 0);
    const pct = Math.round((score / maxScore) * 100);
    const level = pct >= 70 ? 'Alto' : pct >= 35 ? 'Moderado' : 'Bajo';
    return { score, maxScore, pct, level };
  };

  const buildObservation = () => {
    const bio = getAxisStats('bioPull').pct;
    const phy = getAxisStats('physicsPull').pct;
    const fat = getAxisStats('physicsFatigue').pct;
    const ext = getAxisStats('externalWeight').pct;

    const notes: string[] = [];

    if (bio >= 65 && phy >= 65) {
      notes.push(
        'Se nota que las dos carreras te mueven de verdad: por eso elegir se siente difícil, no porque te falte claridad sino porque ambas te importan.',
      );
    } else if (bio >= 65 && phy < 45) {
      notes.push(
        'Hoy la atracción genuina hacia Biología pesa bastante más que el vínculo actual con Física.',
      );
    } else if (phy >= 65 && bio < 45) {
      notes.push(
        'Tu vínculo real con Física sigue muy vivo, incluso por encima de la curiosidad hacia Biología.',
      );
    }

    if (fat >= 65) {
      notes.push(
        'El desgaste de esta etapa en Física está alto: conviene separar ese cansancio de la carrera como tal antes de sacar conclusiones.',
      );
    }

    if (ext >= 65) {
      notes.push(
        'El ruido externo y la identidad vieja están ocupando bastante espacio; vale la pena quitarlos de la ecuación un momento.',
      );
    }

    if (notes.length === 0) {
      notes.push(
        'Ninguna fuerza sola domina del todo hoy. Este espejo no decide por ti, pero te muestra de dónde viene cada sensación.',
      );
    }

    return notes.join(' ');
  };

  return (
    <section
      aria-labelledby="thermometer-heading"
      className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col justify-between px-5 pt-20 pb-10 safe-pb"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#d9b872]">
          Espejo visual
        </p>
        <h2
          id="thermometer-heading"
          className="mt-1.5 text-3xl font-medium leading-tight text-[#eef2f7]"
        >
          ¿Qué está pesando hoy?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#98a6bc]">
          {showingResults
            ? 'Así se ven hoy las cuatro fuerzas que rodean tu decisión. No es un veredicto, solo un espejo honesto.'
            : 'Toca qué tanto resuena cada frase contigo. Tarda menos de un minuto y mide las dos carreras por igual.'}
        </p>
      </div>

      {!showingResults ? (
        <div className="my-6 flex flex-1 flex-col justify-center">
          <div className="mb-3 flex items-center justify-between text-xs text-[#7f8fa6]">
            <span>
              Frase {stepIndex + 1} de {total}
            </span>
            <span>{Math.round(((stepIndex + 1) / total) * 100)}%</span>
          </div>

          <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#6aa9ff] to-[#52e0b7]"
              initial={false}
              animate={{ scaleX: (stepIndex + 1) / total }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="surface-card p-6"
            >
              <p className="font-serif-editorial text-[1.6rem] font-medium leading-[1.28] text-[#eef2f7] sm:text-[1.78rem]">
                “{currentItem.statement}”
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                {CHOICES.map((choice) => {
                  const selected = answers[currentItem.id] === choice.value;
                  return (
                    <button
                      key={choice.value}
                      type="button"
                      onClick={() => handleSelect(choice.value)}
                      className={`btn-base w-full !justify-between rounded-2xl border px-4 py-3.5 text-left ${
                        selected
                          ? 'border-[#d9b872]/60 bg-[#d9b872]/15 text-[#eef2f7]'
                          : 'border-white/10 bg-[#080d17]/75 text-[#d7e0ec] hover:border-white/20'
                      }`}
                    >
                      <span className="text-sm font-medium">{choice.label}</span>
                      <span className="text-xs text-[#8d9db4]">{choice.desc}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card my-6 flex-1 p-5 sm:p-6"
        >
          <div className="space-y-5">
            {THERMOMETER_AXES.map((axis) => {
              const stats = getAxisStats(axis.key);
              return (
                <div key={axis.key}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-[#eef2f7]">{axis.label}</span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: axis.color }}
                    >
                      {stats.level} · {stats.pct}%
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#8d9db4]">{axis.shortDesc}</p>
                  <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: Math.max(0.05, stats.pct / 100) }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full origin-left rounded-full"
                      style={{ backgroundColor: axis.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#080d17]/80 p-4">
            <p className="text-sm leading-relaxed text-[#cfd9e6]">{buildObservation()}</p>
          </div>
        </motion.div>
      )}

      <div className="flex items-center gap-3">
        {!showingResults ? (
          <>
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="btn-base btn-secondary px-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={onNextStage}
              className="btn-base btn-secondary flex-1 text-xs text-[#9fb0c7]"
            >
              <span>Saltar al simulador</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                onReset();
                setStepIndex(0);
              }}
              className="btn-base btn-secondary px-4"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Repetir</span>
            </button>
            <button type="button" onClick={onNextStage} className="btn-base btn-primary flex-1 px-4">
              <span>Ir al simulador</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
