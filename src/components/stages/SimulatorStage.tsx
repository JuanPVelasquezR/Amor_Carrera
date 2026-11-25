import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Leaf, Orbit, RotateCcw, ShieldAlert } from 'lucide-react';
import { EMOTION_OPTIONS, type DecisionChoice } from '../../data/content';
import type { CanvasMood } from '../NightCanvas';

type SimPhase = 'choose' | 'confirm' | 'sending' | 'reveal' | 'compare';

interface SimulatorStageProps {
  feelingsByChoice: Partial<Record<DecisionChoice, string[]>>;
  onSaveFeelings: (choice: DecisionChoice, emotions: string[]) => void;
  onResetSimulator: () => void;
  onMoodChange: (mood: CanvasMood) => void;
  onNextStage: () => void;
}

export function SimulatorStage({
  feelingsByChoice,
  onSaveFeelings,
  onResetSimulator,
  onMoodChange,
  onNextStage,
}: SimulatorStageProps) {
  const [phase, setPhase] = useState<SimPhase>('choose');
  const [activeChoice, setActiveChoice] = useState<DecisionChoice | null>(null);
  const [draftEmotions, setDraftEmotions] = useState<string[]>([]);

  const physicsDone = (feelingsByChoice.physics?.length ?? 0) > 0;
  const biologyDone = (feelingsByChoice.biology?.length ?? 0) > 0;
  const bothDone = physicsDone && biologyDone;

  useEffect(() => {
    if (phase === 'choose' || phase === 'compare') {
      onMoodChange('neutral');
    } else if (activeChoice === 'physics') {
      onMoodChange('physics');
    } else if (activeChoice === 'biology') {
      onMoodChange('biology');
    }
  }, [phase, activeChoice, onMoodChange]);

  useEffect(() => {
    if (phase !== 'sending') return;
    const timer = window.setTimeout(() => {
      setPhase('reveal');
    }, 2100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const startChoice = (choice: DecisionChoice) => {
    setActiveChoice(choice);
    setDraftEmotions(feelingsByChoice[choice] ?? []);
    setPhase('confirm');
  };

  const confirmDecision = () => {
    setPhase('sending');
  };

  const toggleEmotion = (id: string) => {
    if (!activeChoice) return;
    const next = draftEmotions.includes(id)
      ? draftEmotions.filter((e) => e !== id)
      : [...draftEmotions, id];
    setDraftEmotions(next);
    onSaveFeelings(activeChoice, next);
  };

  const getEmotionLabels = (ids: string[] | undefined) => {
    if (!ids || ids.length === 0) return [];
    return ids
      .map((id) => EMOTION_OPTIONS.find((opt) => opt.id === id)?.label)
      .filter(Boolean) as string[];
  };

  const getReflectionLine = (ids: string[]) => {
    if (ids.length === 0) return null;
    const selected = EMOTION_OPTIONS.filter((o) => ids.includes(o.id));
    const openCount = selected.filter((o) => o.tone === 'open').length;
    const heavyCount = selected.filter((o) => o.tone === 'heavy').length;

    if (openCount > 0 && heavyCount === 0) {
      return 'Guarda esa sensación: cuando el cuerpo se afloja o se abre antes de pensar en argumentos, suele ser una pista muy honesta.';
    }
    if (heavyCount > 0 && openCount === 0) {
      return 'Presta atención a ese peso o esas ganas de devolverte: a veces el cuerpo nota algo antes de que la cabeza lo ponga en palabras.';
    }
    return 'Es totalmente normal sentir cosas mezcladas en una decisión grande. Probar la otra puerta te ayuda a ver cuál se siente más tuya.';
  };

  const otherChoice: DecisionChoice = activeChoice === 'physics' ? 'biology' : 'physics';
  const otherDone = otherChoice === 'physics' ? physicsDone : biologyDone;

  return (
    <section
      aria-labelledby="simulator-heading"
      className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col justify-between px-5 pt-20 pb-10 safe-pb"
    >
      <AnimatePresence mode="wait">
        {phase === 'choose' && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-1 flex-col justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#d9b872]">
                Ejercicio de intuición
              </p>
              <h2
                id="simulator-heading"
                className="mt-1.5 text-3xl font-medium leading-tight text-[#eef2f7] sm:text-4xl"
              >
                Tómate esta sección totalmente en serio.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.72] text-[#b6c2d3]">
                Haz de cuenta que en este instante tienes frente a ti la respuesta definitiva para la Facultad. El botón que hundas decide el camino. Respira hondo, no lo pienses demasiado y elige como si fuera real.
              </p>
            </div>

            <div className="my-7 flex flex-col gap-4">
              {/* Physics Button */}
              <button
                type="button"
                onClick={() => startChoice('physics')}
                className="btn-base group w-full !flex-col !items-start !justify-start rounded-2xl border border-[#6aa9ff]/35 bg-[#0c1628]/88 p-5 text-left hover:border-[#6aa9ff]/65"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6aa9ff]">
                    <Orbit className="h-4 w-4" />
                    Física · UdeA
                  </span>
                  {physicsDone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#6aa9ff]/15 px-2.5 py-0.5 text-[11px] text-[#9cc6ff]">
                      <Check className="h-3 w-3" /> Probado
                    </span>
                  )}
                </div>
                <span className="font-serif-editorial mt-2.5 text-2xl font-medium text-[#eef2f7]">
                  Quedarme en Física
                </span>
                <span className="mt-1.5 text-xs leading-relaxed text-[#9cb0cb]">
                  Este botón le avisa al departamento de Física que rechazas el traslado y continúas la carrera.
                </span>
              </button>

              {/* Biology Button */}
              <button
                type="button"
                onClick={() => startChoice('biology')}
                className="btn-base group w-full !flex-col !items-start !justify-start rounded-2xl border border-[#52e0b7]/35 bg-[#0a1c1c]/85 p-5 text-left hover:border-[#52e0b7]/65"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52e0b7]">
                    <Leaf className="h-4 w-4" />
                    Biología · UdeA
                  </span>
                  {biologyDone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#52e0b7]/15 px-2.5 py-0.5 text-[11px] text-[#8ef0d2]">
                      <Check className="h-3 w-3" /> Probado
                    </span>
                  )}
                </div>
                <span className="font-serif-editorial mt-2.5 text-2xl font-medium text-[#eef2f7]">
                  Aceptar el traslado a Biología
                </span>
                <span className="mt-1.5 text-xs leading-relaxed text-[#9cc3ba]">
                  Este botón le confirma a la Facultad que aceptas el traslado y empiezas Biología.
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {bothDone && (
                <button
                  type="button"
                  onClick={() => setPhase('compare')}
                  className="btn-base btn-primary w-full"
                >
                  <span>Ver la comparación de lo que sentiste</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onNextStage}
                className="btn-base btn-secondary w-full text-xs text-[#9fb0c7]"
              >
                <span>Ir a la nota de cierre</span>
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'confirm' && activeChoice && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-1 flex-col justify-center"
          >
            <div className="surface-card border-white/20 p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9b872]/35 bg-[#d9b872]/10 text-[#d9b872]">
                <ShieldAlert className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-3xl font-medium text-[#eef2f7]">¿Confirmas esta decisión?</h3>

              <p className="mt-3 text-sm leading-relaxed text-[#c6d1e0]">
                {activeChoice === 'physics'
                  ? 'Al confirmar, se registrará tu respuesta definitiva ante la Facultad: rechazas el traslado aprobado y continúas en Física.'
                  : 'Al confirmar, se registrará tu respuesta definitiva ante la Facultad: aceptas oficialmente el traslado y pasas a Biología.'}
              </p>

              <p className="mt-3 text-xs text-[#8d9db4]">
                Antes de tocar el botón, nota cómo se siente tu pecho justo en este segundo.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={confirmDecision}
                  className="btn-base btn-primary w-full py-3.5"
                >
                  <span>
                    {activeChoice === 'physics'
                      ? 'Sí, me quedo en Física'
                      : 'Sí, acepto el traslado a Biología'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhase('choose')}
                  className="btn-base btn-secondary w-full py-3"
                >
                  <span>Volver atrás</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'sending' && activeChoice && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <div className="relative flex h-20 w-20 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, ease: 'linear', repeat: Infinity }}
                className="h-20 w-20 rounded-full border border-white/15 border-t-[#eef2f7]"
              />
              {activeChoice === 'physics' ? (
                <Orbit className="absolute h-6 w-6 text-[#6aa9ff]" />
              ) : (
                <Leaf className="absolute h-6 w-6 text-[#52e0b7]" />
              )}
            </div>

            <p className="font-serif-editorial mt-6 text-2xl text-[#eef2f7]">
              Enviando respuesta a la Facultad...
            </p>
            <p className="mt-2 text-xs text-[#8d9db4]">
              {activeChoice === 'physics'
                ? 'Registrando permanencia en Física'
                : 'Confirmando traslado a Biología'}
            </p>
          </motion.div>
        )}

        {phase === 'reveal' && activeChoice && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col justify-between"
          >
            <div className="surface-card p-6 sm:p-7">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${
                  activeChoice === 'physics'
                    ? 'bg-[#6aa9ff]/15 text-[#9cc6ff]'
                    : 'bg-[#52e0b7]/15 text-[#8ef0d2]'
                }`}
              >
                {activeChoice === 'physics' ? 'Simulaste: Quedarme en Física' : 'Simulaste: Pasarme a Biología'}
              </span>

              <h3 className="mt-4 text-3xl font-medium leading-tight text-[#eef2f7]">
                Respira. No se envió nada.
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-[#c6d1e0]">
                Antes de que tu cabeza empiece a justificar con lógica: <strong className="font-medium text-[#eef2f7]">¿qué fue lo primero que sentiste</strong> justo al hundir ese botón?
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {EMOTION_OPTIONS.map((emo) => {
                  const selected = draftEmotions.includes(emo.id);
                  return (
                    <button
                      key={emo.id}
                      type="button"
                      onClick={() => toggleEmotion(emo.id)}
                      aria-pressed={selected}
                      className={`btn-base !min-h-[46px] rounded-xl border px-3 text-sm ${
                        selected
                          ? 'border-[#d9b872]/60 bg-[#d9b872]/18 text-[#f7ebd0]'
                          : 'border-white/10 bg-[#080d17]/75 text-[#b6c2d3]'
                      }`}
                    >
                      <span>{emo.label}</span>
                    </button>
                  );
                })}
              </div>

              {draftEmotions.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl border border-white/10 bg-[#080d17]/80 p-3.5 text-xs leading-relaxed text-[#b6c2d3]"
                >
                  {getReflectionLine(draftEmotions)}
                </motion.p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {!otherDone ? (
                <button
                  type="button"
                  onClick={() => startChoice(otherChoice)}
                  className="btn-base btn-primary w-full py-3.5"
                >
                  <span>
                    {otherChoice === 'biology'
                      ? 'Ahora prueba aceptar Biología para comparar'
                      : 'Ahora prueba quedarte en Física para comparar'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhase('compare')}
                  className="btn-base btn-primary w-full py-3.5"
                >
                  <span>Comparar lo que sentiste en ambos</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setPhase('choose')}
                className="btn-base btn-secondary w-full py-3 text-xs"
              >
                <span>Volver a los dos botones</span>
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'compare' && (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#d9b872]">
                Tu espejo intuitivo
              </p>
              <h3 className="mt-1.5 text-3xl font-medium leading-tight text-[#eef2f7]">
                Lo que sintió tu cuerpo en cada puerta
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#98a6bc]">
                Mira las dos tarjetas lado a lado, sin juzgarlas. A veces ver tu propia reacción escrita aclara más que seguir dándole vueltas.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="surface-card border-[#6aa9ff]/30 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6aa9ff]">
                    <Orbit className="h-4 w-4" />
                    <span>Al quedarte en Física</span>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {getEmotionLabels(feelingsByChoice.physics).map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-[#6aa9ff]/30 bg-[#6aa9ff]/12 px-3 py-1 text-xs font-medium text-[#dceaff]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="surface-card border-[#52e0b7]/30 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#52e0b7]">
                    <Leaf className="h-4 w-4" />
                    <span>Al pasarte a Biología</span>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {getEmotionLabels(feelingsByChoice.biology).map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-[#52e0b7]/30 bg-[#52e0b7]/12 px-3 py-1 text-xs font-medium text-[#d8fbf0]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <button type="button" onClick={onNextStage} className="btn-base btn-primary w-full py-3.5">
                <span>Ir a la nota de cierre</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetSimulator();
                  setActiveChoice(null);
                  setDraftEmotions([]);
                  setPhase('choose');
                }}
                className="btn-base btn-secondary w-full py-3 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Volver a hacer el simulador</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
